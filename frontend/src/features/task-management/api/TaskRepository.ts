import { type Task } from "../types/Task";

// [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-FE-T02]
export interface TaskRepository {
    getAll(): Promise<Task[]>;
    save(task: Task): Promise<void>;
    createTask(title: string): Promise<Task>;
    delete(id: string): Promise<void>;
    update(task: Task): Promise<void>;
}
