import { useUpdateTaskStatus } from "../hooks/useTasks";
import type { Task } from "../types/Task";
import { cn } from '@/lib/utils';
import { Calendar, CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface TaskItemProps {
    task: Task;
}

// [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-FE-T03]
// [Feature: Task Management] [Story: TM-USER-003] [Ticket: TM-USER-003-FE-T02]
export function TaskItem({ task }: TaskItemProps) {
    const { mutate: updateStatus, isPending } = useUpdateTaskStatus();
    const isCompleted = task.status === 'completada';

    const handleToggle = () => {
        const nextStatus = isCompleted ? 'pendiente' : 'completada';
        updateStatus({ taskId: task.id, status: nextStatus });
    };

    return (
        <div
            className={cn(
                "flex items-center gap-3 p-4 rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md group",
                isCompleted && "opacity-60 bg-muted/50"
            )}
        >
            <button
                onClick={handleToggle}
                disabled={isPending}
                className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors disabled:opacity-50"
                aria-label={isCompleted ? "Mark as pending" : "Mark as completed"}
            >
                {isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                    <Circle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                )}
            </button>

            <div className="flex-1 min-w-0 space-y-1">
                <p
                    className={cn(
                        "font-medium truncate leading-none cursor-pointer",
                        isCompleted && "line-through text-muted-foreground font-normal"
                    )}
                    onClick={handleToggle}
                >
                    {task.title}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{new Date(task.created_at).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}
