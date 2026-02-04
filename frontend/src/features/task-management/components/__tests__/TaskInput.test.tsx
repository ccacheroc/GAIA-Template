import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskInput } from '../TaskInput';
import userEvent from '@testing-library/user-event';

describe('TaskInput', () => {
    it('should render input and button', () => {
        render(<TaskInput onSave={vi.fn()} />);
        expect(screen.getByPlaceholderText(/What needs to be done?/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    });

    it('should call onSave with trimmed value when valid', async () => {
        const onSave = vi.fn();
        render(<TaskInput onSave={onSave} />);

        await userEvent.type(screen.getByPlaceholderText(/What needs to be done?/i), 'Buy Milk');
        await userEvent.click(screen.getByRole('button', { name: /add/i }));

        expect(onSave).toHaveBeenCalledWith('Buy Milk');
        expect(screen.getByPlaceholderText(/What needs to be done?/i)).toHaveValue('');
    });

    it('should show error when submitting empty value', async () => {
        const onSave = vi.fn();
        render(<TaskInput onSave={onSave} />);

        await userEvent.click(screen.getByRole('button', { name: /add/i }));

        expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
        expect(onSave).not.toHaveBeenCalled();
    });

    it('should disable interactions when disabled', () => {
        render(<TaskInput onSave={vi.fn()} disabled />);
        expect(screen.getByPlaceholderText(/What needs to be done?/i)).toBeDisabled();
        expect(screen.getByRole('button', { name: /add/i })).toBeDisabled();
    });
});
