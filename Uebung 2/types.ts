type Person = {
    firstname: string;
    lastname: string;
    age?: string;
};

// 1.1
let hans: Person = {
    firstname: "Hans",
    lastname: "Müller"
};

// 1.2
let me = {
    firstname: "Flavius",
    lastname: "Me",
    id: 15020215135
};

// 1.3
// me = hans; no workz
// hans = me; workz

// 1.4
console.log(<any>me.id);

// 1.5
type Worker = {
    firstname: string;
    lastname: string;
    age?: number;
    id: string;
    salary: number;
    department: string;
};

let worker: Worker = {
    firstname: "Rando",
    lastname: "Not Me",
    id: "1502021535",
    salary: 5000,
    department: "IT"
};

let worker2: Worker = {
    firstname: "Rando",
    lastname: "Not not Me",
    id: "5465132551",
    salary: 3500,
    department: "IT"
};

let person: Person = {
    firstname: "Random",
    lastname: "Not not not Me"
};
