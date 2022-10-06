import express, { query } from "express";
import { Todo } from "./todo";
const app = express();
const port = 3000;

let items: Todo[] = [];


app.listen(port, () => {
    console.log(`I'm works http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/items", (req, res) => {
    // db.query('Select * from todo where done = false');
    if (req.query) {
        req.query["done"] === "true";
        res.send(items);
    }

    res.send(JSON.stringify(items.filter(i => !i.done)));
});

app.post("/item", (req, res) => {
    let item = JSON.parse(req.body);

    items.push(item);
    console.log(item);
    console.log(items);
    res.send("Item added");
});

app.post("/items", (req, res) => {
    items.push(req.body);
    res.send("items added");
});

app.delete("/item/:description", (req, res) => {
    items.filter(i => i.description !== req.params.description);
    res.send("item deleted");
});
