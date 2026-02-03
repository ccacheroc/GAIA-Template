import type { Task } from "../types/Task";
import { cn } from '@/lib/utils';
import { Calendar, CheckCircle2, Circle } from 'lucide-react';

interface TaskItemProps {
    task: Task;
}

// [Feature: Task Management] [Ticket: TM-USER-001-FE-T03]
export function TaskItem({ task }: TaskItemProps) {
    const isCompleted = task.status === 'completed';

    return (
        <div
            className={cn(
                "flex items-center gap-3 p-4 rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md",
                isCompleted && "opacity-60 bg-muted/50"
            )}
        >
            <div className="flex-shrink-0 text-muted-foreground">
                {isCompleted ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <Circle className="w-5 h-5" />}
            </div>

            <div className="flex-1 min-w-0 space-y-1">
                <p
                    className={cn(
                        "font-medium truncate leading-none",
                        isCompleted && "line-through text-muted-foreground"
                    )}
                >
                    {task.title}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
}
