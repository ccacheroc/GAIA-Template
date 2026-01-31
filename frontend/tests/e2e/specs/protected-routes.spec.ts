
import { test, expect } from '@playwright/test';

// [Feature: User Authentication] [Story: AUTH-TEACHER-003] [Ticket: AUTH-TEACHER-003-FE-T03]

test.describe('Protected Routes', () => {

    test('should redirect unauthenticated user to login page when accessing root', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveURL(/\/login/);
    });

    test('should redirect unauthenticated user to login page when accessing create quiz', async ({ page }) => {
        await page.goto('/quizzes/create');
        await expect(page).toHaveURL(/\/login/);
    });

    test('should redirect unauthenticated user to login page when accessing editor', async ({ page }) => {
        await page.goto('/quizzes/123/edit');
        await expect(page).toHaveURL(/\/login/);
    });
});
