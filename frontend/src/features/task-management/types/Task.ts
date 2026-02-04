// [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-FE-T03]
export type TaskStatus = 'pendiente' | 'en_progreso' | 'completada';
export type TaskPriority = 'baja' | 'media' | 'alta';

// [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-FE-T03]
export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    created_at: string;
    updated_at: string;
    completed_at?: string;
}
