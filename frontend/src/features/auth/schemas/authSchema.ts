import { z } from 'zod';

// [Feature: User Authentication] [Story: AUTH-TEACHER-001] [Ticket: AUTH-TEACHER-001-FE-T03]

export const registerSchema = z.object({
    email: z.string()
        .min(1, 'El email es obligatorio')
        .email('Email inválido'),
    password: z.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(100, 'La contraseña es demasiado larga'),
    confirmPassword: z.string()
        .min(1, 'Confirmar la contraseña es obligatorio'),
    full_name: z.string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .optional()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

export type RegisterInput = z.infer<typeof registerSchema>;
