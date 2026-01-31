
import { test, expect } from '@playwright/test';

test.describe('Question Reordering', () => {
    const quizId = '123e4567-e89b-12d3-a456-426614174000';
    const initialQuestions = [
        {
            id: 'q1',
            quiz_id: quizId,
            content: 'Question One',
            type: 'TF',
            sequence: 1,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        {
            id: 'q2',
            quiz_id: quizId,
            content: 'Question Two',
            type: 'TF',
            sequence: 2,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        {
            id: 'q3',
            quiz_id: quizId,
            content: 'Question Three',
            type: 'TF',
            sequence: 3,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }
    ];

    let currentQuestions: any[] = [];

    test.beforeEach(async ({ page }) => {
        currentQuestions = JSON.parse(JSON.stringify(initialQuestions));

        // Mock GET quiz with questions
        await page.route(`**/api/v1/quizzes/${quizId}`, async route => {
            const json = {
                id: quizId,
                title: 'Reorder Test Quiz',
                description: 'Testing DnD',
                status: 'DRAFT',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                questions: currentQuestions
            };
            await route.fulfill({ json });
        });
    });

    test('should reorder questions using keyboard', async ({ page }) => {
        // Mock PATCH reorder
        let patchPayload: any = null;
        await page.route(`**/api/v1/quizzes/${quizId}/reorder`, async route => {
            patchPayload = route.request().postDataJSON();

            // Update mutable state to simulate backend persistence
            const reorderMap = new Map(patchPayload.items.map((i: any) => [i.id, i.sequence]));
            currentQuestions.forEach(q => {
                if (reorderMap.has(q.id)) {
                    q.sequence = reorderMap.get(q.id);
                }
            });
            currentQuestions.sort((a: any, b: any) => a.sequence - b.sequence);

            await route.fulfill({ status: 200 });
        });

        await page.goto(`/quizzes/${quizId}/edit`);

        // Verify initial order by checking text content
        // We target the touch-none container which is the SortableQuestionItem wrapper
        const listItems = page.locator('.touch-none');
        await expect(listItems.nth(0)).toContainText('Question One');
        await expect(listItems.nth(0)).toContainText('#1');
        await expect(listItems.nth(1)).toContainText('Question Two');
        await expect(listItems.nth(2)).toContainText('Question Three');

        // Locate the handle of the first item
        const handle1 = listItems.nth(0).getByLabel('Drag handle');

        // Focus the handle
        await handle1.focus();

        // Start dragging
        await page.keyboard.press('Space');

        // Wait for lift
        await page.waitForTimeout(100);

        // Move down twice to swap with 3rd item
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(100);
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(100);

        // Drop
        await page.keyboard.press('Space');
        await page.waitForTimeout(100);

        // Verify PATCH payload
        // If we moved item 1 (q1) to position 3.
        // Expected order: q2, q3, q1
        // Expected sequences: q2->1, q3->2, q1->3
        expect(patchPayload).toBeTruthy();
        expect(patchPayload.items).toHaveLength(3);

        const q1Update = patchPayload.items.find((i: any) => i.id === 'q1');
        const q2Update = patchPayload.items.find((i: any) => i.id === 'q2');
        const q3Update = patchPayload.items.find((i: any) => i.id === 'q3');

        expect(q1Update.sequence).toBe(3);
        expect(q2Update.sequence).toBe(1);
        expect(q3Update.sequence).toBe(2);

        // Verify UI update (optimistic) without reload
        await expect(listItems.nth(0)).toContainText('Question Two');
        await expect(listItems.nth(1)).toContainText('Question Three');
        await expect(listItems.nth(2)).toContainText('Question One');
    });
});
