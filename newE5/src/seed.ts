import { userTaskStore } from "./db/task.db";
import { userStore } from "./db/user.db";
import { Task } from "./Task";
import bcrypt from "bcrypt";


export function seed() {
    let kehren = new Task("Kehren");
    userTaskStore.get("l@f.de").addTask(kehren);
    userTaskStore.get("l@f.de").addTask(new Task("Lernen", new Date("2022-09-26T07:58:30"), true));


    let user = {
        "firstname": "Ludwig",
        "lastname": "Fuhr",
        "email": "l@f.de",
        "password": bcrypt.hashSync("Passwo0r+", 10)
    };
    userStore.push(user);
}