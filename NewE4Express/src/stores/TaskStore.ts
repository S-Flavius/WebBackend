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
