import { test, expect } from '@playwright/test';
import { CreateQuizPage } from '../pages/CreateQuizPage';

test.describe('Quiz Creation Flow', () => {
    test('should show validation error if title is missing', async ({ page }) => {
        const createQuizPage = new CreateQuizPage(page);
        await createQuizPage.goto();
        await createQuizPage.submit();
        await createQuizPage.expectTitleError('Title is mandatory');
    });

    test('should navigate to editor after successful creation', async ({ page }) => {
        const createQuizPage = new CreateQuizPage(page);

        // Mock API response
        await page.route('**/api/v1/quizzes', async route => {
            const json = {
                id: '123e4567-e89b-12d3-a456-426614174000',
                teacher_id: '123e4567-e89b-12d3-a456-426614174001',
                title: 'E2E Quiz',
                status: 'DRAFT',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            await route.fulfill({ json });
        });

        await createQuizPage.goto();
        await createQuizPage.fillMetadata('E2E Quiz', 'Created via Playwright');
        await createQuizPage.submit();

        // Verify successful navigation
        await expect(page).toHaveURL(/.*\/quizzes\/123e4567-e89b-12d3-a456-426614174000\/edit/);
        await expect(page.getByText('Editor de Quiz (Próximamente)')).toBeVisible();
    });
});
