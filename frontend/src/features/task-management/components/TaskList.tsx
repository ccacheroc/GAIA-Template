import { useTasks } from '../hooks/useTasks';
import { TaskItem } from './TaskItem';
import { Loader2, ClipboardList } from 'lucide-react';

// [Feature: Task Management] [Ticket: TM-USER-001-FE-T03]
export function TaskList() {
    const { data: tasks, isLoading, isError } = useTasks();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-4 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p>Loading tasks...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                Failed to load tasks. Please try refreshing.
            </div>
        );
    }

    if (!tasks || tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground bg-muted/20 border-2 border-dashed rounded-xl">
                <div className="p-4 bg-muted rounded-full mb-4">
                    <ClipboardList className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">No tasks yet</h3>
                <p className="text-sm max-w-xs mt-2">
                    Your task list is empty. Add a new task to get started!
                </p>
            </div>
        );
    }

    // Sort by newest first
    const sortedTasks = [...tasks].sort((a, b) => b.createdAt - a.createdAt);

    return (
        <div className="space-y-3">
            {sortedTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
}
