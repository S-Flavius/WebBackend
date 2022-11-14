import express, { NextFunction, Request, Response } from "express";
import { addTasks, delTask, getItems } from "./controllers/task.controller";
import { taskSchema, tasksSchema } from "./schemes/task.schema";
import { ZodError, Schema } from "zod";
import { loginSchema, userSchema } from "./schemes/user.schema";
import { authenticateToken, getCurrentUser, login, logout, register } from "./controllers/user.controller";
import { seed } from "./seed";
import { connect, disconnect } from "mongoose";

// Beispieldaten
seed();

const app = express();

app.use(express.json());

app.use("/api", authenticateToken);

function validateMiddleware(schema: Schema) {

    return (req: Request, res: Response, next: NextFunction) => {
        try {
            Object.assign(req, schema.parse({ body: req.body, query: req.query, params: req.params }));
            next();
        } catch (error) {
            const error2 = <ZodError>error;
            res.status(400).send(error2.issues);
        }
    };
}

app.listen(3000, () => {
    console.log("Express is running on http://localhost:3000");
    connect("mongodb://fsecheli:fsecheliP@ux5:27017/fsecheli");
    console.log("Mongo connected");

}).close(disconnect);

app.get("/api/tasks", getItems);

app.post("/api/task", validateMiddleware(taskSchema), (req, res) => {
    req.body = [req.body];
    addTasks(req, res);
});

app.post("/api/tasks", validateMiddleware(tasksSchema), addTasks);

app.delete("/api/task/:id", delTask);



app.route("/api/user/login")
    .post(validateMiddleware(loginSchema), login)
    .delete(logout);

app.route("/api/user/")
    .post(validateMiddleware(userSchema), register)
    .get(getCurrentUser);
