import { http } from '@/api/http';
import type { RegisterInput, LoginInput } from '../schemas/authSchema';

// [Feature: User Authentication] [Story: AUTH-TEACHER-001] [Ticket: AUTH-TEACHER-001-FE-T03]

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

export const authApi = {
    register: async (data: RegisterInput) => {
        // Remove confirmPassword before sending to API
        const { confirmPassword, ...registerData } = data;
        const response = await http.post('/auth/register', registerData);
        return response.data;
    },

    // [Feature: User Authentication] [Story: AUTH-TEACHER-002] [Ticket: AUTH-TEACHER-002-FE-T02]
    login: async (data: LoginInput): Promise<AuthResponse> => {
        const response = await http.post<AuthResponse>('/auth/login', data);
        return response.data;
    }
};
