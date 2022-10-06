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


let taskList: Task[] = [];

// Beispieldaten
taskList.push(new Task("Kehren"));
taskList.push(new Task("Lernen", new Date("2022-09-26T07:58:30")));
taskList[1].isDone = true;




const app = express();

app.use((req, res, next) => {

    if (req.url !== "/bulkupload")
        express.json()(req, res, next);
    express.text()(req, res, next);
});

app.listen(3000, () => {
    console.log("Express is running on http://localhost:3000");
});

app.get("/items", (req, res) => {
    if (req.query.showDone == "true")
        res.json(taskList);
    else
        res.send(taskList.filter(item => !item.isDone));
});

app.post("/item", (req, res) => {
    req.body = [req.body];
    addTasks(req, res);
});

app.post("/items", addTasks);

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
        for (let existingTask of taskList) {
            if (existingTask.title == newTask.title) {
                res.status(400).send("Already there");
                return;
            }
        }
    };

    taskList = taskList.concat(newTasks);
    res.sendStatus(200);
}

app.delete("/item/:title", (req, res) => {
    let oldLen = taskList.length;
    taskList = taskList.filter(e => e.title != req.params.title);
    if (oldLen == taskList.length)
        res.status(400).send("Could not delete");
    else
        res.send("Task deleted!");
});

// import {v4 as guid } from "uuid";

// console.log(guid());
