import { Request, Response } from "express";
import { userTaskStore } from "../db/task.db";
import { Task } from "../Task";

export function getItems(req: Request, res: Response) {
    if (req.query.showDone == "true")
        res.json(userTaskStore.get(res.locals.user.email).getTaskArray());

    else
        res.send(userTaskStore.get(res.locals.user.email).getTaskArray().filter(item => !item.isDone));
}


export function addTasks(req: Request, res: Response) {
    (<Task[]>req.body).forEach(userTaskStore.get(res.locals.user.email).addTask);
    res.sendStatus(200);
}

export function delTask(req: Request, res: Response) {
    if (userTaskStore.get(res.locals.user.email).has(req.params.id)) {
        userTaskStore.get(res.locals.user.email).delete(req.params.id);
        res.send("Task deleted!");
    }
    else
        res.status(400).send("Could not delete");
}