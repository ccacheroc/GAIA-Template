
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTasks } from '../useTasks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocalStorageTaskRepository } from '../../api/LocalStorageTaskRepository';

// Auto-mock the repository
vi.mock('../../api/LocalStorageTaskRepository');

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient} > {children} </QueryClientProvider>
    );
};

describe('useTasks', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch tasks successfully', async () => {
        const mockTasks = [
            { id: '1', title: 'Task 1', status: 'pending', createdAt: Date.now() },
        ];

        // Setup mock return
        const MockRepository = vi.mocked(LocalStorageTaskRepository);
        MockRepository.mockImplementation(function () {
            return {
                getAll: vi.fn().mockResolvedValue(mockTasks)
            } as any;
        });

        const { result } = renderHook(() => useTasks(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.data).toEqual(mockTasks);
    });
});
