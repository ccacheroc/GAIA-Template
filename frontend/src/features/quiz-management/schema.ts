import { z } from 'zod';

export const quizSchema = z.object({
    title: z.string().min(1, 'El título es obligatorio').max(255),
    description: z.string().optional(),
});

export type QuizFormValues = z.infer<typeof quizSchema>;

export const optionSchema = z.object({
    content: z.string().min(1, 'El contenido de la opción es obligatorio'),
    is_correct: z.boolean(),
});

export const questionSchema = z.object({
    content: z.string().min(1, 'El texto de la pregunta es obligatorio'),
    options: z.array(optionSchema).min(2, 'Debe tener al menos 2 opciones').max(6, 'Como máximo 6 opciones'),
}).refine(data => data.options.filter(opt => opt.is_correct).length === 1, {
    message: "Exactamente una opción debe ser marcada como correcta",
    path: ["options"],
});

export type QuestionFormValues = z.infer<typeof questionSchema>;
