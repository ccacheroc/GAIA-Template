import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

// [Feature: User Authentication] [Story: AUTH-TEACHER-001] [Ticket: AUTH-TEACHER-001-FE-T03]

test.describe('Teacher Registration', () => {
    test('should show validation errors for empty fields', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.goto();
        await registerPage.submit();

        // Wait for validation messages to appear
        await expect(page.getByText('El email es obligatorio')).toBeVisible({ timeout: 10000 });
        await expect(page.getByText('La contraseña debe tener al menos 8 caracteres')).toBeVisible({ timeout: 10000 });
    });

    test('should register successfully with mock API', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        // Mock API response
        await page.route('**/api/v1/auth/register', async route => {
            const json = {
                id: '123e4567-e89b-12d3-a456-426614174000',
                email: 'test@gaia.edu',
                full_name: 'Test Teacher',
                created_at: new Date().toISOString()
            };
            await route.fulfill({ json, status: 201 });
        });

        await registerPage.goto();
        await registerPage.fillForm({
            full_name: 'Test Teacher',
            email: 'test@gaia.edu',
            password: 'securepassword123',
            confirmPassword: 'securepassword123'
        });
        await registerPage.submit();

        await registerPage.expectSuccessToast();
        await expect(page).toHaveURL(/.*\/login/);
    });

    test('should show error for duplicate email from API', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        // Mock API error
        await page.route('**/api/v1/auth/register', async route => {
            await route.fulfill({
                status: 400,
                json: { detail: 'Email already registered' }
            });
        });

        await registerPage.goto();
        await registerPage.fillForm({
            email: 'duplicate@gaia.edu',
            password: 'securepassword123',
            confirmPassword: 'securepassword123'
        });
        await registerPage.submit();

        await registerPage.expectErrorToast('Email already registered');
    });
});
