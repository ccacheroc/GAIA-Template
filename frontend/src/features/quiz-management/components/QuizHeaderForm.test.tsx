import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/test/utils';
import { QuizHeaderForm } from './QuizHeaderForm';

describe('QuizHeaderForm', () => {
    it('should show error message when submitting empty title', async () => {
        render(<QuizHeaderForm onSubmit={vi.fn().mockResolvedValue(undefined)} />);

        const saveButton = screen.getByRole('button', { name: /Guardar y Continuar/i });
        fireEvent.click(saveButton);

        expect(await screen.findByText(/Title is mandatory/i)).toBeInTheDocument();
    });

    it('should call onSubmit with form data when valid', async () => {
        const mockSubmit = vi.fn().mockResolvedValue(undefined);
        render(<QuizHeaderForm onSubmit={mockSubmit} />);

        const titleInput = screen.getByLabelText(/Título del Quiz/i);
        fireEvent.change(titleInput, { target: { value: 'My New Quiz' } });

        const saveButton = screen.getByRole('button', { name: /Guardar y Continuar/i });
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalledWith({
                title: 'My New Quiz',
                description: '',
            });
        });
    });
});
