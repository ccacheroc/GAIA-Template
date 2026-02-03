import { describe, it, expect } from 'vitest';
import { createTaskSchema } from '../schemas';

describe('createTaskSchema', () => {
    it('should validate a valid task title', () => {
        const result = createTaskSchema.safeParse({ title: 'Buy groceries' });
        expect(result.success).toBe(true);
    });

    it('should fail if title is empty', () => {
        const result = createTaskSchema.safeParse({ title: '' });
        expect(result.success).toBe(false);
    });

    it('should fail if title is too long', () => {
        const result = createTaskSchema.safeParse({ title: 'a'.repeat(101) });
        expect(result.success).toBe(false);
    });

    it('should fail if title is missing', () => {
        const result = createTaskSchema.safeParse({});
        expect(result.success).toBe(false);
    });
});
