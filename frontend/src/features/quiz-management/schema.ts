import { z } from 'zod';

export const quizSchema = z.object({
    title: z.string().min(1, 'Title is mandatory').max(255),
    description: z.string().optional(),
});

export type QuizFormValues = z.infer<typeof quizSchema>;

export const optionSchema = z.object({
    content: z.string().min(1, 'Option content is required'),
    is_correct: z.boolean(),
});

export const questionSchema = z.object({
    content: z.string().min(1, 'Question text is required'),
    options: z.array(optionSchema).min(2, 'Must have at least 2 options').max(6, 'At most 6 options'),
}).refine(data => data.options.filter(opt => opt.is_correct).length === 1, {
    message: "Exactly one option must be marked as correct",
    path: ["options"],
});

export type QuestionFormValues = z.infer<typeof questionSchema>;
