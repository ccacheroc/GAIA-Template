import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTasks, useCreateTask } from '@/features/task-management/hooks/useTasks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import http from '@/api/http';

// Mock http
vi.mock('@/api/http', () => ({
    default: {
        get: vi.fn(),
        post: vi.fn(),
    },
}));

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
        },
    });
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe('Task hooks', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('useTasks', () => {
        it('should fetch tasks successfully', async () => {
            const mockTasks = [
                { id: '1', title: 'Task 1', status: 'pending', created_at: new Date().toISOString() },
            ];

            (http.get as any).mockResolvedValue({ data: mockTasks });

            const { result } = renderHook(() => useTasks(), {
                wrapper: createWrapper(),
            });

            await waitFor(() => expect(result.current.isSuccess).toBe(true));
            expect(result.current.data).toEqual(mockTasks);
            expect(http.get).toHaveBeenCalledWith('/tasks/');
        });
    });

    describe('useCreateTask', () => {
        it('should create task successfully', async () => {
            const mockTask = { id: '1', title: 'New Task', status: 'pending' };
            (http.post as any).mockResolvedValue({ data: mockTask });

            const { result } = renderHook(() => useCreateTask(), {
                wrapper: createWrapper(),
            });

            await result.current.mutateAsync('New Task');

            expect(http.post).toHaveBeenCalledWith('/tasks/', { title: 'New Task' });
        });
    });
});
