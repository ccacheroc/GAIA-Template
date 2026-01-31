import { test, expect } from '@playwright/test';

test.describe('Quiz Preview Flow', () => {
    const quizId = '123e4567-e89b-12d3-a456-426614174000';

    test.beforeEach(async ({ page }) => {
        // Mock GET quiz response (Quiz with questions)
        await page.route(`**/api/v1/quizzes/${quizId}`, async route => {
            const json = {
                id: quizId,
                owner_id: '123e4567-e89b-12d3-a456-426614174001',
                title: 'Previewable Quiz',
                description: 'Check how it looks',
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
                    },
                    {
                        id: 'q2',
                        content: 'Question 2',
                        type: 'MULTIPLE_CHOICE',
                        sequence: 2,
                        options: [
                            { id: 'o3', content: 'Option A', is_correct: true },
                            { id: 'o4', content: 'Option B', is_correct: false },
                            { id: 'o5', content: 'Option C', is_correct: false }
                        ]
                    }
                ]
            };
            await route.fulfill({ json });
        });
    });

    test('should enter and exit preview mode', async ({ page }) => {
        await page.goto(`/quizzes/${quizId}/edit`);

        // Ensure we are in editor mode
        await expect(page.getByRole('heading', { name: 'Previewable Quiz' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Preview' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'True/False' })).toBeVisible();

        // Enter Preview
        await page.getByRole('button', { name: 'Preview' }).click();

        // Verify Preview UI
        await expect(page.getByText('Student Preview')).toBeVisible();
        await expect(page.getByRole('button', { name: 'True/False' })).not.toBeVisible();
        await expect(page.getByRole('button', { name: 'Exit Preview' })).toBeVisible();

        // Interact with questions
        await page.getByLabel('True').click();
        await page.getByLabel('Option B').click();

        // Submit in preview
        await page.getByRole('button', { name: 'Submit Quiz' }).click();
        await expect(page.getByText('Quiz submitted successfully! (Preview Mode)')).toBeVisible();

        // Exit Preview
        await page.getByRole('button', { name: 'Exit Preview' }).click();

        // Verify return to editor
        await expect(page.getByText('Student Preview')).not.toBeVisible();
        await expect(page.getByRole('button', { name: 'True/False' })).toBeVisible();
    });

    test('should show warning if submitting incomplete quiz in preview', async ({ page }) => {
        await page.goto(`/quizzes/${quizId}/edit`);
        await page.getByRole('button', { name: 'Preview' }).click();

        // Submit without answering all
        await page.getByRole('button', { name: 'Submit Quiz' }).click();
        await expect(page.getByText('You have answered 0 of 2 questions.')).toBeVisible();
    });
});
