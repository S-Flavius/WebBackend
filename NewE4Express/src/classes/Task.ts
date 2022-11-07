import { v4 as guid } from "uuid";
export class Task {
    uuid: string;
    title: string;
    dueDate?: Date;
    isDone: boolean;

    constructor(
        title: string = "New Task",
        dueDate: Date | undefined = undefined,
        isDone: boolean = false
    ) {
        this.uuid = guid();
        this.title = title;
        this.dueDate = dueDate;
        this.isDone = isDone;
    }

}

// import {v4 as guid} from "uuid";

// console.log(guid());
