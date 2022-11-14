import { Task } from "../classes/Task";

class TaskStore extends Map<string, Task> {
    add(task: Task) {
        super.set(task.uuid, task);
    }

    getValuesArray(): Array<Task> {
        return [...this.values()];
    }
}

export let taskStore: TaskStore = new TaskStore();

class UserTaskStore extends Map<string, TaskStore>{

    get(key: string): TaskStore {
        if (!this.has(key)) {
            this.set(key, new TaskStore());
        }
        return super.get(key)!;
    }
}

export let userTaskStore: UserTaskStore = new UserTaskStore();
