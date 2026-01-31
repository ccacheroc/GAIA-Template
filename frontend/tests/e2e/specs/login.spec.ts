import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// [Feature: User Authentication] [Story: AUTH-TEACHER-002] [Ticket: AUTH-TEACHER-002-FE-T02]

test.describe('Teacher Login', () => {
    test('should show validation errors for empty fields', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.submit();

        // Wait for validation messages to appear
        await expect(page.getByText('El email es obligatorio')).toBeVisible();
        await expect(page.getByText('La contraseña es obligatoria')).toBeVisible();
    });

    test('should login successfully with mock API', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // Mock API response with valid JWT structure (header.payload.signature)
        await page.route('**/api/v1/auth/login', async route => {
            const json = {
                // Valid-looking JWT
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVGVhY2hlciIsImV4cCI6OTk5OTk5OTk5OX0.Signature',
                token_type: 'bearer'
            };
            await route.fulfill({ json, status: 200 });
        });

        await loginPage.goto();
        await loginPage.login('test@gaia.edu', 'securepassword123');

        // await loginPage.expectSuccessToast(); 
        await expect(page).toHaveURL('/');
    });

    test('should show error for invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        // Mock API error
        await page.route('**/api/v1/auth/login', async route => {
            await route.fulfill({
                status: 401,
                json: { detail: 'Correo o contraseña incorrectos' }
            });
        });

        await loginPage.goto();
        await loginPage.login('wrong@gaia.edu', 'wrongpass');

        await loginPage.expectErrorToast('Correo o contraseña incorrectos'); // Assuming toast
    });
});
