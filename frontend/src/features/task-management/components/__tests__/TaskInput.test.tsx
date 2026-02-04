import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TaskInput } from '../TaskInput';
import userEvent from '@testing-library/user-event';
import { useCreateTask } from '../../hooks/useTasks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the hook
vi.mock('../../hooks/useTasks', () => ({
    useCreateTask: vi.fn(),
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

describe('TaskInput', () => {
    const mockMutate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useCreateTask as any).mockReturnValue({
            mutate: mockMutate,
            isPending: false,
        });
    });

    it('should render input and button', () => {
        render(<TaskInput />, { wrapper: createWrapper() });
        expect(screen.getByPlaceholderText(/What needs to be done?/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    });

    it('should call createTask mutation with value when valid', async () => {
        render(<TaskInput />, { wrapper: createWrapper() });

        await userEvent.type(screen.getByPlaceholderText(/What needs to be done?/i), 'Buy Milk');
        await userEvent.click(screen.getByRole('button', { name: /add/i }));

        expect(mockMutate).toHaveBeenCalledWith('Buy Milk', expect.any(Object));
    });

    it('should have disabled button when input is empty', async () => {
        render(<TaskInput />, { wrapper: createWrapper() });
        const button = screen.getByRole('button', { name: /add task/i });
        expect(button).toBeDisabled();
    });

    it('should enable button when input has value', async () => {
        render(<TaskInput />, { wrapper: createWrapper() });
        const input = screen.getByPlaceholderText(/What needs to be done?/i);
        const button = screen.getByRole('button', { name: /add task/i });

        await userEvent.type(input, 'Buy Milk');
        expect(button).not.toBeDisabled();
    });

    it('should disable interactions when mutation is pending', () => {
        (useCreateTask as any).mockReturnValue({
            mutate: mockMutate,
            isPending: true,
        });

        render(<TaskInput />, { wrapper: createWrapper() });
        expect(screen.getByPlaceholderText(/What needs to be done?/i)).toBeDisabled();
        expect(screen.getByRole('button', { name: /add task/i })).toBeDisabled();
        expect(screen.getByRole('button', { name: /add task/i }).querySelector('.animate-spin')).toBeInTheDocument();
    });
});
