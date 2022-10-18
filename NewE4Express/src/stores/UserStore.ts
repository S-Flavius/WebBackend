import bcrypt from "bcrypt";


export let userMap = new Map<string, string>();


// Beispieldaten
userMap.set("test", bcrypt.hashSync("Tester1", 10));
userMap.set("Mark", bcrypt.hashSync("Zuck", 10));
userMap.set("Bill", bcrypt.hashSync("Gates", 10));
userMap.set("Steve", bcrypt.hashSync("Jobs", 10));
