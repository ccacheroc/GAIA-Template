import { describe, it, expect, beforeEach } from 'vitest';
import { LocalStorageTaskRepository } from '../LocalStorageTaskRepository';
import { type Task } from "../../types/Task";

// [Feature: Task Management] [Story: TM-USER-001] [Ticket: TM-USER-001-FE-T02]
describe('LocalStorageTaskRepository', () => {
    let repository: LocalStorageTaskRepository;
    const STORAGE_KEY = 'tasks-data';

    beforeEach(() => {
        // Clear storage before each test
        localStorage.clear();
        repository = new LocalStorageTaskRepository();
    });

    it('should save a task and retrieve it', async () => {
        const task: Task = {
            id: '123',
            title: 'Test Task',
            status: 'pending',
            createdAt: Date.now()
        };

        await repository.save(task);
        const tasks = await repository.getAll();

        expect(tasks).toHaveLength(1);
        expect(tasks[0]).toEqual(task);
    });

    it('should retrieve empty list when storage is clean', async () => {
        const tasks = await repository.getAll();
        expect(tasks).toEqual([]);
    });

    it('should delete a task', async () => {
        const task: Task = {
            id: '123',
            title: 'To Be Deleted',
            status: 'pending',
            createdAt: Date.now()
        };
        await repository.save(task);

        await repository.delete('123');
        const tasks = await repository.getAll();

        expect(tasks).toHaveLength(0);
    });

    it('should update a task', async () => {
        const task: Task = {
            id: '123',
            title: 'To Update',
            status: 'pending',
            createdAt: Date.now()
        };
        await repository.save(task);

        const updatedTask = { ...task, status: 'completed' as const };
        await repository.update(updatedTask);

        const tasks = await repository.getAll();
        expect(tasks[0].status).toBe('completed');
    });

    it('should ignore corrupt data in localStorage', async () => {
        localStorage.setItem(STORAGE_KEY, 'invalid-json');

        const tasks = await repository.getAll();
        // Should handle error gracefully and return empty or wipe
        expect(tasks).toEqual([]);
        // Should preserve safe fallbacks
    });
    it('should create a new task with default fields', async () => {
        const newTask = await repository.createTask('New Integration Task');

        expect(newTask.id).toBeDefined();
        expect(newTask.title).toBe('New Integration Task');
        expect(newTask.status).toBe('pending');
        expect(newTask.createdAt).toBeDefined();

        const tasks = await repository.getAll();
        expect(tasks).toHaveLength(1);
        expect(tasks[0]).toEqual(newTask);
    });
});
