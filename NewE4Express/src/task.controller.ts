import { Request, Response } from "express";
import { Task } from "./Task";
import { taskMap } from "./TaskStore";


export function deleteByUUID(req, res) {
    let oldLen = taskMap.size;
    taskMap.delete(req.params.uuid);
    if (oldLen == taskMap.size)
        res.status(400).send("Could not delete");

    else
        res.send("Task deleted!");
}

export function addTasks(req: Request, res: Response) {
    // Check Format and create objects
    try {
        if (!Array.isArray(req.body))
            throw "Is not an Array";
        var newTasks = req.body.map(Task.fromJSON);
    } catch (e) {
        res.status(400).send(e);
        return;
    }

    // Check for existing tasks
    for (const newTask of newTasks) {
        for (let existingTask of taskMap.values()) {
            if (existingTask.uuid == newTask.uuid) {
                res.status(400).send("Already there");
                return;
            }
        }
        taskMap.set(newTask.uuid, newTask);
    };

    res.sendStatus(200);
}

export function bulkUpload(req: Request, res: Response) {
    let request: String = req.body;

    let items: String[] = request.split("\n");

    //Check for header
    let titlePos = 0, datePos = 1, donePos = 2;
    let splitFirstLine = items[0].split(";");
    if (items[0].includes("title"))
        titlePos = splitFirstLine.indexOf("title");
    if (items[0].includes("date"))
        datePos = splitFirstLine.indexOf("date");
    if (items[0].includes("done"))
        datePos = splitFirstLine.indexOf("done");


    items.forEach(item => {
        let task: Task;
        let splitItem = item.split(";");


        if (splitItem.length === 1 && titlePos === 1)
            task = new Task(splitItem[titlePos]);
        else if (splitItem.length === 2 && titlePos <= 2) {
            task = new Task(splitItem[titlePos], new Date(splitItem[datePos]));
        }
        else if (splitItem.length === 3 && titlePos <= 3)
            task = new Task(splitItem[titlePos],
                new Date(splitItem[datePos]) || undefined,
                splitItem[donePos] != "open");

        else
            throw "Invalid format";
        taskMap.set(task.uuid, task);
    });

    console.log(req.body);
    res.send();
}

export function postItems(req: Request, res: Response) {
    req.body = [req.body];
    addTasks(req, res);
}

export function getItems(req: Request, res: Response) {
    if (req.query.showDone == "true")
        res.json(taskMap.values());

    else
        res.send(Array.from(taskMap.values()).filter(item => !item.isDone));
}
