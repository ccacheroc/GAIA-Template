import { describe, it, expect } from 'vitest';
import { quizSchema } from '../schema';

describe('Quiz Schema Validation', () => {
    it('should fail with empty title', () => {
        const result = quizSchema.safeParse({ title: '' });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0].message).toBe('El título es obligatorio');
        }
    });

    it('should pass with valid title', () => {
        const result = quizSchema.safeParse({ title: 'Valid Code' });
        expect(result.success).toBe(true);
    });
});
