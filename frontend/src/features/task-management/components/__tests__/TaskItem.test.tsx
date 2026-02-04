import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TaskItem } from '../TaskItem';
import userEvent from '@testing-library/user-event';
import { useUpdateTaskStatus } from '../../hooks/useTasks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TaskStatus, TaskPriority } from '../../types/Task';

// Mock the hook
vi.mock('../../hooks/useTasks', () => ({
    useUpdateTaskStatus: vi.fn(),
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

describe('TaskItem', () => {
    const mockMutate = vi.fn();
    const mockTask = {
        id: '1',
        title: 'Test Task',
        status: 'pendiente' as TaskStatus,
        priority: 'media' as TaskPriority,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
        (useUpdateTaskStatus as any).mockReturnValue({
            mutate: mockMutate,
            isPending: false,
        });
    });

    it('should render task title', () => {
        render(<TaskItem task={mockTask} />, { wrapper: createWrapper() });
        expect(screen.getByText('Test Task')).toBeInTheDocument();
    });

    it('should call updateStatus mutation when clicking the button', async () => {
        render(<TaskItem task={mockTask} />, { wrapper: createWrapper() });

        const button = screen.getByRole('button', { name: /mark as completed/i });
        await userEvent.click(button);

        expect(mockMutate).toHaveBeenCalledWith({
            taskId: '1',
            status: 'completada',
        });
    });

    it('should call updateStatus mutation when clicking the title', async () => {
        render(<TaskItem task={mockTask} />, { wrapper: createWrapper() });

        const title = screen.getByText('Test Task');
        await userEvent.click(title);

        expect(mockMutate).toHaveBeenCalledWith({
            taskId: '1',
            status: 'completada',
        });
    });

    it('should show loader when pending', () => {
        (useUpdateTaskStatus as any).mockReturnValue({
            mutate: mockMutate,
            isPending: true,
        });

        render(<TaskItem task={mockTask} />, { wrapper: createWrapper() });
        expect(screen.getByRole('button')).toBeDisabled();
    });
});
