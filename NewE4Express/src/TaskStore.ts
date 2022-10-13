import { Task } from "./Task";


export let taskMap = new Map<String, Task>();



// Beispieldaten
let tempTask = new Task("Kehren");
taskMap.set(tempTask.uuid, tempTask);
tempTask = new Task("Putzen");
taskMap.set(tempTask.uuid, tempTask);
tempTask = new Task("Backen");
taskMap.set(tempTask.uuid, tempTask);
