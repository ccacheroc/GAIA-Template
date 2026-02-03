import { useQuery } from '@tanstack/react-query';
import { LocalStorageTaskRepository } from '../api/LocalStorageTaskRepository';

// [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-FE-T03]
// Custom hook to fetch all tasks using React Query for caching and state management.
export function useTasks() {
    const repository = new LocalStorageTaskRepository();

    return useQuery({
        queryKey: ['tasks'],
        queryFn: () => repository.getAll(),
    });
}
