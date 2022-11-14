import { v4 as guid } from "uuid";
export class Task {
    title: string;
    dueDate?: Date;
    isDone: boolean;
    id: Guid;

    constructor(title: string, dueDate: Date | undefined = undefined, isDone: boolean = false) {
        this.title = title;
        this.dueDate = dueDate;
        this.isDone = isDone;
        this.id = guid()
    }
}

export type Guid = string
