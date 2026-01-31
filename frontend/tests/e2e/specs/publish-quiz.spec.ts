import { test, expect } from '@playwright/test';
import { CreateQuizPage } from '../pages/CreateQuizPage'; // Only for URL mocking if needed, or just use page.goto

test.describe('Quiz Publishing Flow', () => {
    const quizId = '123e4567-e89b-12d3-a456-426614174000';

    test.beforeEach(async ({ page }) => {
        // Mock GET quiz response (Quiz with questions)
        await page.route(`**/api/v1/quizzes/${quizId}`, async route => {
            const json = {
                id: quizId,
                teacher_id: '123e4567-e89b-12d3-a456-426614174001',
                title: 'Publishable Quiz',
                description: 'Ready to go',
                status: 'DRAFT',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                questions: [
                    {
                        id: 'q1',
                        content: 'Question 1',
                        type: 'TF',
                        sequence: 1,
                        options: [
                            { id: 'o1', content: 'True', is_correct: true },
                            { id: 'o2', content: 'False', is_correct: false }
                        ]
                    }
                ]
            };
            await route.fulfill({ json });
        });
    });

    test('should disable publish button if quiz has no questions', async ({ page }) => {
        // Override mock for this test
        await page.route(`**/api/v1/quizzes/${quizId}`, async route => {
            const json = {
                id: quizId,
                title: 'Empty Quiz',
                status: 'DRAFT',
                questions: []
            };
            await route.fulfill({ json });
        });

        await page.goto(`/quizzes/${quizId}/edit`);
        const publishBtn = page.getByRole('button', { name: 'Publish Quiz' });
        await expect(publishBtn).toBeDisabled();
    });

    test('should successfully publish a valid quiz', async ({ page }) => {
        // Mock Publish API
        await page.route(`**/api/v1/quizzes/${quizId}/publish`, async route => {
            const json = {
                id: quizId,
                title: 'Publishable Quiz',
                status: 'PUBLISHED',
                questions: [] // Response doesn't matter much for toast check, but status does for badge
            };
            await route.fulfill({ json });
        });

        // Mock GET after publish (React Query invalidation triggers re-fetch)
        // We need to return PUBLISHED status on next fetch
        // Since we can't easily state-machine route handler in playwright simple mock,
        // we can rely on the Mutation success side-effects or mock the second GET.
        // Or simpler: The mutation returns the NEW quiz state, and queryClient sets it?
        // Actually typical flow: Mutation returns data -> Cache updated? 
        // My hook invalidates queries. So a new GET request is made.
        // Let's attempt to mock the second request.

        // Complex mocking: toggle response based on count?
        let callCount = 0;
        await page.route(`**/api/v1/quizzes/${quizId}`, async route => {
            callCount++;
            const status = callCount > 1 ? 'PUBLISHED' : 'DRAFT';
            const json = {
                id: quizId,
                teacher_id: '123e4567-e89b-12d3-a456-426614174001',
                title: 'Publishable Quiz',
                description: 'Ready to go',
                status: status,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                questions: [
                    {
                        id: 'q1',
                        content: 'Question 1',
                        type: 'TF',
                        sequence: 1,
                        options: [
                            { id: 'o1', content: 'True', is_correct: true },
                            { id: 'o2', content: 'False', is_correct: false }
                        ]
                    }
                ]
            };
            await route.fulfill({ json });
        });

        await page.goto(`/quizzes/${quizId}/edit`);

        // Wait for load
        await expect(page.getByRole('heading', { name: 'Publishable Quiz' })).toBeVisible();

        const publishBtn = page.getByRole('button', { name: 'Publish Quiz' });
        await expect(publishBtn).toBeEnabled();
        await publishBtn.click();

        // Verify Confirmation Dialog
        await expect(page.getByText('Are you sure you want to publish?')).toBeVisible();
        await page.getByRole('button', { name: 'Publish Now' }).click();

        // Verify toast
        await expect(page.getByText('Quiz published successfully! It is now live.')).toBeVisible();

        // Verify Badge appears (replacing button)
        await expect(page.getByText('Published', { exact: true })).toBeVisible();
        await expect(publishBtn).not.toBeVisible();

        // Verify READ-ONLY mode: Add buttons should be missing
        await expect(page.locator('#add-tf-btn')).not.toBeVisible();
        await expect(page.locator('#add-mc-btn')).not.toBeVisible();

        // Verify READ-ONLY mode: Drag handle should be missing
        await expect(page.getByLabel('Drag handle')).not.toBeVisible();
    });

    test('should show error toast on validation failure', async ({ page }) => {
        // Mock Publish API Failure
        await page.route(`**/api/v1/quizzes/${quizId}/publish`, async route => {
            await route.fulfill({
                status: 400,
                json: { detail: 'Quiz must have at least one correct answer' }
            });
        });

        await page.goto(`/quizzes/${quizId}/edit`);
        const publishBtn = page.getByRole('button', { name: 'Publish Quiz' });
        await publishBtn.click();

        // Confirmation (even for failure)
        await expect(page.getByText('Are you sure you want to publish?')).toBeVisible();
        await page.getByRole('button', { name: 'Publish Now' }).click();

        await expect(page.getByText('Quiz must have at least one correct answer')).toBeVisible();
    });
});
