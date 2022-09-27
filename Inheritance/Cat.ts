import { Pet } from "./Pet";

export class Cat implements Pet {
    name: String;
    age: Number;
    owner: String;
    color: String;
    isGoodWithKids: Boolean = true;

    constructor(name: String, age: Number, owner: String, color: String) {
        this.name = name;
        this.age = age;
        this.owner = owner;
        this.color = color;
    }

    meow() {
        console.log("Meow!");
    }

    poop() {
        console.log("Cat-poop!");
    }
}
