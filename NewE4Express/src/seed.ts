import { Task } from "./classes/Task";
import { taskStore } from "./stores/TaskStore";
import { userStore } from "./stores/UserStore";
import bcrypt from "bcrypt";


export function seed() {
    let kehren = new Task("Kehren");
    taskStore.set(kehren.uuid, kehren);
    taskStore.add(new Task("Lernen", new Date("2022-09-26T07:58:30"), true));

    let user = {
        "firstname": "Ludwig",
        "lastname": "Fuhr",
        "email": "l@f.de",
        "password": bcrypt.hashSync("goodPassword1234 space+", 10)
    };
    userStore.push(user);
}
