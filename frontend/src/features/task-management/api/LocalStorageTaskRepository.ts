import { type Task } from "../types/Task";
import { type TaskRepository } from "./TaskRepository";

// [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-FE-T02]
export class LocalStorageTaskRepository implements TaskRepository {
    private readonly STORAGE_KEY = 'tasks-data';

    async getAll(): Promise<Task[]> {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (!data) return [];
        try {
            return JSON.parse(data) as Task[];
        } catch {
            return [];
        }
    }

    async save(task: Task): Promise<void> {
        const tasks = await this.getAll();
        tasks.push(task);
        this.persist(tasks);
    }

    async createTask(title: string): Promise<Task> {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title,
            status: 'pendiente',
            priority: 'media',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        await this.save(newTask);
        return newTask;
    }

    async delete(id: string): Promise<void> {
        const tasks = await this.getAll();
        const filtered = tasks.filter(t => t.id !== id);
        this.persist(filtered);
    }

    async update(task: Task): Promise<void> {
        const tasks = await this.getAll();
        const index = tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
            tasks[index] = task;
            this.persist(tasks);
        }
    }

    private persist(tasks: Task[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    }
}
