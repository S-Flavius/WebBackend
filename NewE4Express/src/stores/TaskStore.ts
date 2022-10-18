import { Task } from "../classes/Task";


export let taskMap = new Map<String, Task>();



// Beispieldaten
let tempTask = new Task("Kehren");
taskMap.set(tempTask.uuid, tempTask);
tempTask = new Task("Putzen");
taskMap.set(tempTask.uuid, tempTask);
tempTask = new Task("Backen");
taskMap.set(tempTask.uuid, tempTask);
tempTask = new Task("Kochen", new Date(2022, 10, 17), false);
taskMap.set(tempTask.uuid, tempTask);
