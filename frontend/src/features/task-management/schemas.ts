// [Feature: Task Management] [Story: TM-USER-002] [Ticket: TM-USER-002-FE-T01]
import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string()
        .min(1, 'Title is required')
        .max(100, 'Title is too long')
});
