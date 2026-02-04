import { TaskList } from "../components/TaskList";
import { TaskInput } from "../components/TaskInput";

// [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-FE-T03]
// [Feature: Task Management] [Story: TM-USER-002] [Ticket: TM-USER-002-FE-T02]
export function TaskPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">My Tasks</h2>
                    <p className="text-muted-foreground">Manage your daily tasks efficiently.</p>
                </div>
                <TaskInput />
            </div>

            <TaskList />
        </div>
    );
}
