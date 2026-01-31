import { useMutation, useQueryClient } from '@tanstack/react-query';
import { http } from '@/api/http';
import type { QuestionCreate, QuestionResponse, QuestionReorderRequest } from '../types';

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

// [Feature: Quiz Management] [Story: QQ-TEACHER-004] [Ticket: QQ-TEACHER-004-FE-T02]

export const useReorderQuestions = (quizId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: QuestionReorderRequest): Promise<void> => {
            await http.patch(`/quizzes/${quizId}/reorder`, data);
        },
        onMutate: async (newOrder: QuestionReorderRequest) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['quiz', quizId] });

            // Snapshot the previous value
            const previousQuiz = queryClient.getQueryData(['quiz', quizId]);

            // Optimistically update to the new value
            if (previousQuiz) {
                queryClient.setQueryData(['quiz', quizId], (old: any) => {
                    if (!old || !old.questions) return old;

                    // Create a map for quick lookup
                    const reorderMap = new Map(newOrder.items.map(item => [item.id, item.sequence]));

                    const updatedQuestions = old.questions.map((q: any) => {
                        if (reorderMap.has(q.id)) {
                            return { ...q, sequence: reorderMap.get(q.id) };
                        }
                        return q;
                    }).sort((a: any, b: any) => a.sequence - b.sequence);

                    return { ...old, questions: updatedQuestions };
                });
            }

            return { previousQuiz };
        },
        onError: (_err, _newOrder, context: { previousQuiz: unknown } | undefined) => {
            // Rollback on error
            if (context?.previousQuiz) {
                queryClient.setQueryData(['quiz', quizId], context.previousQuiz);
            }
        },
        onSuccess: () => {
            // Refetch after success to ensure sync
            queryClient.invalidateQueries({ queryKey: ['quiz', quizId] });
        },
    });
};
