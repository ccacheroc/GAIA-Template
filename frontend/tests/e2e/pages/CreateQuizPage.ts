import { Page, Locator, expect } from '@playwright/test';

export class CreateQuizPage {
    readonly page: Page;
    readonly titleInput: Locator;
    readonly descriptionInput: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleInput = page.getByLabel('Título del Quiz');
        this.descriptionInput = page.getByLabel('Descripción (Opcional)');
        this.saveButton = page.getByRole('button', { name: 'Guardar y Continuar' });
    }

    async goto() {
        await this.page.goto('/quizzes/create');
    }

    async fillMetadata(title: string, description: string = '') {
        await this.titleInput.fill(title);
        if (description) {
            await this.descriptionInput.fill(description);
        }
    }

    async submit() {
        await this.saveButton.click();
    }

    async expectTitleError(message: string) {
        await expect(this.page.getByText(message)).toBeVisible();
    }
}
