// [Feature: Task Management] [Story: TM-USER-002] [Ticket: TM-USER-002-FE-T02]
import { useState } from 'react';
import { createTaskSchema } from '../schemas';
import { Plus } from 'lucide-react';

interface TaskInputProps {
    onSave: (title: string) => void;
    disabled?: boolean;
}

export function TaskInput({ onSave, disabled }: TaskInputProps) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const result = createTaskSchema.safeParse({ title });

        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }

        onSave(title.trim());
        setTitle('');
        setError(null);
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            if (error) setError(null);
                        }}
                        disabled={disabled}
                        placeholder="What needs to be done?"
                        className={`flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-red-500 focus-visible:ring-red-500' : 'border-input'
                            }`}
                        aria-invalid={!!error}
                    />
                    {error && (
                        <span className="absolute -bottom-5 left-0 text-xs text-red-500">
                            {error}
                        </span>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={disabled || !title.trim()}
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    aria-label="Add task"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add
                </button>
            </div>
        </form>
    );
}
