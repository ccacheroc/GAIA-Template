import { useQuery } from '@tanstack/react-query';
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
