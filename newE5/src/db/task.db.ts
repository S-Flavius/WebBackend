import { Guid, Task } from "../Task";

class TaskStore extends Map<Guid, Task> {
    addTask(t: Task) {
        this.set(t.id, t);
    }

    getTaskArray(): Task[] {
        return [... this.values()];
    }
}

type Email = string

class UserTaskStore extends Map < Email, TaskStore > {
    
    get(key: string): TaskStore {
        if (!this.has(key)) {
            this.set(key, new TaskStore())
        }
        return super.get(key)!
    }
    
}

export var userTaskStore = new UserTaskStore()