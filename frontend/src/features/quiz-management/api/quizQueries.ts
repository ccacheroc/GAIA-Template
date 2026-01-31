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

import { useQuery } from '@tanstack/react-query';
import type { QuestionResponse } from '../types';

export interface QuizDetail extends Quiz {
    questions: QuestionResponse[];
}

export const useQuiz = (quizId: string) => {
    return useQuery({
        queryKey: ['quiz', quizId],
        queryFn: async () => {
            const response = await http.get<QuizDetail>(`/quizzes/${quizId}`);
            return response.data;
        },
        enabled: !!quizId,
    });
};

export const useQuizzes = () => {
    return useQuery({
        queryKey: ['quizzes'],
        queryFn: async () => {
            const response = await http.get<Quiz[]>('/quizzes');
            return response.data;
        },
    });
};

// [Feature: Quiz Management] [Story: QQ-TEACHER-005] [Ticket: QQ-TEACHER-005-FE-T01]
export const usePublishQuiz = (quizId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const response = await http.post<QuizDetail>(`/quizzes/${quizId}/publish`, {});
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quizzes'] });
            queryClient.invalidateQueries({ queryKey: ['quiz', quizId] });
        },
    });
};
export const useDeleteQuiz = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (quizId: string) => {
            await http.delete(`/quizzes/${quizId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['quizzes'] });
        },
    });
};
