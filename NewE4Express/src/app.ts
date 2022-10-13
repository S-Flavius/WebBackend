/**
 * Musterlösung Aufgabe Todo-API Version 1
 * - Verwendung von class hat keinen Mehrwert (bis jetzt)
 * - toJSON brauchen wir wg. getter/setter
 * - rudimentäre Prüfungen der Form vorhanden (Es kann (absichtlich) immer noch Quatsch in die taskList geschrieben werden)
 * - Vermeidung von doppeltem Code
 * - Das Datum ist relativ aufwändig.
 */

import express from "express";
import {
    addTasks, bulkUpload, deleteByUUID,
    getItems, postItems
} from "./task.controller";

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

app.get("api/tasks", getItems);

app.post("api/task", postItems);

app.post("api/tasks", addTasks);

app.post("api/bulkupload", bulkUpload);

app.delete("api/task/:uuid", deleteByUUID);
