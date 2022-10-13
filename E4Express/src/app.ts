import express, { query } from "express";
import { Todo } from "./Todo";
const app = express();
const port = 3000;

let items: Todo[] = [];


app.use(express.json());

app.use();


app.listen(port, () => {
    console.log(`I'm works http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/items", (req, res) => {
    if (req.query["showDone"] === "true") {
        res.send(items);
    } else {
        res.status(200).send(items.filter(i => !i.isDone));
    }
});

app.post("/item", (req, res) => {
    let item: Todo = req.body;

    items.push(item);
    res.send("Item added");
});

app.post("/items", (req, res) => {

    for (const item of req.body) {
        if (!isTodo(item))
            res.status(400).send("Invalid item");
    }

    for (const item of req.body) {
        console.log(item.type);
        items.push(item);
    }


    res.status(200).send("Items added");
});

app.post("/items/bulkupload", (req, res) => {

});

app.delete("/item/:description", (req, res) => {
    items = items.filter(i => i.description !== req.params.description);
    res.send("item deleted");
});

function isTodo(item: any): item is Todo {
    return item.description !== undefined
        && item.done !== undefined;
}
