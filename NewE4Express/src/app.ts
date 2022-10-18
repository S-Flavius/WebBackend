import express, { NextFunction, Request, Response } from "express";
import { Schema } from 'Zod';
import { taskSchema, tasksSchema } from "./schemes/taskSchemes";
import {
    addTasks, //bulkUpload,
    deleteByUUID,
    getItems, addTask as addTask
} from './controllers/task.controller';
import { login, signUp } from "./controllers/user.controller";
import { userSchema } from "./schemes/userSchemes";

const app = express();

app.use((req, res, next) => {
    if (req.originalUrl == "/bulkupload")
        express.text()(req, res, next);
    else
        express.json()(req, res, next);
});


const validateMiddlewareFactory = (schema: Schema) => ((req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = schema.parse({ body: req.body, params: req.params, query: req.query }).body;
    } catch (e) {
        res.status(400).send(e);
        next();
    }
    res.status(200).send('item inserted');
    next();
});


app.listen(3000, () => {
    console.log("Express is running on http://localhost:3000");
});

app.get("/api/tasks", getItems);

app.post("/api/task", validateMiddlewareFactory(taskSchema), addTask);

app.post("/api/tasks", validateMiddlewareFactory(tasksSchema), addTasks);

// app.post("/api/bulkupload", bulkUpload);

app.delete("/api/task/:uuid", deleteByUUID);


app.post("/api/user", signUp);

app.get("/api/user/login", login);

app.delete("/api/user/login", () => { return; });
