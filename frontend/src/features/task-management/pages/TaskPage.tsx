import { TaskList } from "../components/TaskList";

// [Feature: Task Management] [Ticket: TM-USER-001-FE-T03]
export function TaskPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">My Tasks</h2>
                <p className="text-muted-foreground">Manage your daily tasks efficiently.</p>
            </div>

            <TaskList />
        </div>
    );
}
