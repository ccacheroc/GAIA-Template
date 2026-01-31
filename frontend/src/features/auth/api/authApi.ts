import { http } from '@/api/http';
import type { RegisterInput } from '../schemas/authSchema';

// [Feature: User Authentication] [Story: AUTH-TEACHER-001] [Ticket: AUTH-TEACHER-001-FE-T03]

export const authApi = {
    register: async (data: RegisterInput) => {
        // Remove confirmPassword before sending to API
        const { confirmPassword, ...registerData } = data;
        const response = await http.post('/auth/register', registerData);
        return response.data;
    }
};
