import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskList } from '../TaskList';
import { useTasks } from '../../hooks/useTasks';

// Mock the hook
vi.mock('../../hooks/useTasks');

describe('TaskList', () => {
    it('should render loading state initially', () => {
        (useTasks as any).mockReturnValue({
            isLoading: true,
            data: undefined,
        });

        render(<TaskList />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('should render empty state when no tasks', () => {
        (useTasks as any).mockReturnValue({
            isLoading: false,
            isSuccess: true,
            data: [],
        });

        render(<TaskList />);
        expect(screen.getByText(/No tasks yet/i)).toBeInTheDocument();
    });

    it('should render tasks when data is available', () => {
        (useTasks as any).mockReturnValue({
            isLoading: false,
            isSuccess: true,
            data: [
                { id: '1', title: 'Buy Milk', status: 'pending', createdAt: Date.now() },
                { id: '2', title: 'Walk Dog', status: 'completed', createdAt: Date.now() - 1000 },
            ],
        });

        render(<TaskList />);
        expect(screen.getByText('Buy Milk')).toBeInTheDocument();
        expect(screen.getByText('Walk Dog')).toBeInTheDocument();
    });
});
