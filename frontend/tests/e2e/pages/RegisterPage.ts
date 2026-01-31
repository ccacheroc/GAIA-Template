import { Page, expect } from '@playwright/test';

// [Feature: User Authentication] [Story: AUTH-TEACHER-001] [Ticket: AUTH-TEACHER-001-FE-T03]

export class RegisterPage {
    constructor(private page: Page) { }

    async goto() {
        await this.page.goto('/register');
    }

    async fillForm(data: { full_name?: string, email: string, password: string, confirmPassword: string }) {
        if (data.full_name) {
            await this.page.getByTestId('fullname-input').fill(data.full_name);
        }
        await this.page.getByTestId('email-input').fill(data.email);
        await this.page.getByTestId('password-input').fill(data.password);
        await this.page.getByTestId('confirm-password-input').fill(data.confirmPassword);
    }

    async submit() {
        await this.page.getByTestId('register-submit').click();
    }

    async expectSuccessToast() {
        await expect(this.page.getByText('Cuenta creada con éxito')).toBeVisible();
    }

    async expectErrorToast(message: string) {
        await expect(this.page.getByText(message)).toBeVisible();
    }
}
