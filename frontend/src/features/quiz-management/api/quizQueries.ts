import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '@/api/http';
import type { CreateQuizDTO, UpdateQuizDTO, Quiz } from '../types';

export const useCreateQuiz = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateQuizDTO) => {
            const response = await http.post<Quiz>('/quizzes', data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quizzes'] });
        },
    });
};

export const useUpdateQuiz = (quizId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: UpdateQuizDTO) => {
            const response = await http.put<Quiz>(`/quizzes/${quizId}`, data);
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['quizzes'] });
            queryClient.invalidateQueries({ queryKey: ['quiz', data.id] });
        },
    });
};
