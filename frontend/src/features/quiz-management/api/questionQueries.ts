
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '@/api/http';
import type { QuestionCreate, QuestionResponse } from '../types';

// [Feature: Quiz Management] [Story: QQ-TEACHER-002] [Ticket: QQ-TEACHER-002-FE-T03]

export const useCreateQuestion = (quizId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: QuestionCreate): Promise<QuestionResponse> => {
            const response = await http.post<QuestionResponse>(`/quizzes/${quizId}/questions`, data);
            return response.data;
        },
        onSuccess: () => {
            // Invalidate the quiz query to fetch updated questions
            queryClient.invalidateQueries({ queryKey: ['quiz', quizId] });
            queryClient.invalidateQueries({ queryKey: ['quizzes'] });
        },
    });
};
