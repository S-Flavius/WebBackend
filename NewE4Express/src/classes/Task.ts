import { v4 as guid } from "uuid";

export class Task {
    title: string;
    dueDate?: Date;
    isDone: boolean;
    uuid: String;

    constructor(title: string = "New Task", dueDate: Date | undefined = undefined, isDone: boolean = false) {
        this.uuid = guid();
        this.title = title;
        this.dueDate = dueDate;
        this.isDone = isDone;
    }
}
