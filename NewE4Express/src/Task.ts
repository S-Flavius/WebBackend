export class Task {
    title: string;
    #dueDate?: Date;
    isDone: boolean;

    constructor(title: string = "New Task", dueDate: Date | string | undefined = undefined, isDone: boolean = false) {
        this.title = title;
        this.dueDate = dueDate;
        this.isDone = isDone;
    }

    get dueDate(): Date | undefined {
        return this.#dueDate;
    }
    set dueDate(d: Date | string | undefined) {
        if (typeof d == "string")
            this.#dueDate = new Date(d);
        else
            this.#dueDate = d;
    }

    static fromJSON(obj: any): Task {
        if (typeof obj.title != "string")
            throw "No title for task provided";
        return new Task(obj.title, obj.dueDate, obj.isDone == true);
    }

    toJSON() {
        let result: any = {};
        Object.assign(result, this);
        result.dueDate = this.dueDate;
        return result;
    }
}

// export type TaskType = {
//     title: string;
//     dueDate?: string;
//     isDone: boolean;
// };
