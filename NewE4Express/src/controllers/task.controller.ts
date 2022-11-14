import { Request, Response } from "express";
import { Task } from "../classes/Task";
import { userTaskStore } from "../stores/TaskStore";


export function deleteByUUID(req: Request, res: Response) {
    let oldLen = userTaskStore.get(res.locals.user.email).size;
    userTaskStore.get(res.locals.user.email).delete(req.params.uuid);
    if (oldLen == userTaskStore.get(res.locals.user.email).size)
        res.status(400).send("Could not delete");

    else
        res.send("Task deleted!");
}


export function addTask(req: Request, res: Response) {
    req.body = [req.body];
    addTasks(req, res);
}

export function addTasks(req: Request, res: Response) {
    var newTasks: Task[] = req.body;

    newTasks.forEach(t => userTaskStore.get(res.locals.user.email).set(t.uuid, t));

    res.sendStatus(200);
}

// export function bulkUpload(req: Request, res: Response) {
//     let request: String = req.body;

//     let items: String[] = request.split("\n");

//     //Check for header
//     let titlePos = 0, datePos = 1, donePos = 2;
//     let splitFirstLine = items[0].split(";");
//     if (items[0].includes("title"))
//         titlePos = splitFirstLine.indexOf("title");
//     if (items[0].includes("date"))
//         datePos = splitFirstLine.indexOf("date");
//     if (items[0].includes("done"))
//         datePos = splitFirstLine.indexOf("done");


//     items.forEach(item => {
//         let task: Task;
//         let splitItem = item.split(";");

//         if (splitItem.length === 1 && titlePos === 1)
//             task = new Task(splitItem[titlePos]);
//         else if (splitItem.length === 2 && titlePos <= 2) {
//             task = new Task(splitItem[titlePos], new Date(splitItem[datePos]));
//         }
//         else if (splitItem.length === 3 && titlePos <= 3) {
//             task = new Task(splitItem[titlePos],
//                 new Date(splitItem[datePos]) || undefined,
//                 splitItem[donePos] != "open");
//         } else
//             throw "Invalid format";
//         taskMap.set(task.uuid, task);
//     });
//
//     console.log(req.body);
//     res.send();
// }


export function getItems(req: Request, res: Response) {
    if (req.query.showDone == "true")
        res.json(userTaskStore.get(res.locals.user.email).values());
    else
        res.send(Array.from(userTaskStore.get(res.locals.user.email).values()).filter(item => !item.isDone));
}
