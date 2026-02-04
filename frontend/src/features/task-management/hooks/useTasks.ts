import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import http from '../../../api/http';
import type { Task } from '../types/Task';

// [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-FE-T03]
// Custom hook to fetch all tasks from backend using React Query.
export function useTasks() {
    return useQuery<Task[]>({
        queryKey: ['tasks'],
        queryFn: async () => {
            const response = await http.get('/tasks/');
            return response.data;
        },
    });
}

// [Feature: Task Management] [Story: TM-USER-002] [Ticket: TM-USER-002-FE-T02]
// Custom hook to create a new task using React Query mutation.
export function useCreateTask() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (title: string) => {
            const response = await http.post('/tasks/', { title });
            return response.data;
        },
        onSuccess: () => {
            // Invalidate and refetch tasks list after creation
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
}
// [Feature: Task Management] [Story: TM-USER-003] [Ticket: TM-USER-003-BE-T01]
// Custom hook to update task status using React Query mutation.
export function useUpdateTaskStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ taskId, status }: { taskId: string; status: string }) => {
            const response = await http.patch(`/tasks/${taskId}`, { status });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
}
