/**
 * Musterlösung Aufgabe Todo-API Version 1
 * - Verwendung von class hat keinen Mehrwert (bis jetzt)
 * - toJSON brauchen wir wg. getter/setter
 * - rudimentäre Prüfungen der Form vorhanden (Es kann (absichtlich) immer noch Quatsch in die taskList geschrieben werden)
 * - Vermeidung von doppeltem Code
 * - Das Datum ist relativ aufwändig.
 */

import express, { Request, Response } from "express";
import { Task } from "./Task";


let taskMap = new Map<String, Task>();

// Beispieldaten
let tempTask = new Task("Kehren");
taskMap.set(tempTask.uuid, tempTask);
tempTask = new Task("Putzen");
taskMap.set(tempTask.uuid, tempTask);
tempTask = new Task("Backen");
taskMap.set(tempTask.uuid, tempTask);

const app = express();


app.use((req, res, next) => {

    if (req.originalUrl == "/bulkupload")
        express.text()(req, res, next);
    else
        express.json()(req, res, next);
});

app.listen(3000, () => {
    console.log("Express is running on http://localhost:3000");
});

app.get("/items", (req, res) => {
    if (req.query.showDone == "true")
        res.json(taskMap.values());
    else
        res.send(Array.from(taskMap.values()).filter(item => !item.isDone));
});

app.post("/item", (req, res) => {
    req.body = [req.body];
    addTasks(req, res);
});

app.post("/items", addTasks);

app.post("/bulkupload", (req, res) => {
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
});

function addTasks(req: Request, res: Response) {
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

// app.delete("/item/title/:title", (req, res) => {
//     let oldLen = taskMap.size;
//     taskMap.delete(req.params.title);
//     if (oldLen == taskMap.size)
//         res.status(400).send("Could not delete");
//     else {
//         res.send("Task deleted!");
//     }
// });

app.delete("/item/:uuid", (req, res) => {
    let oldLen = taskMap.size;
    taskMap.delete(req.params.uuid);
    if (oldLen == taskMap.size)
        res.status(400).send("Could not delete");
    else
        res.send("Task deleted!");
});
