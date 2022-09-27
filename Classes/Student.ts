import { GradeClass } from "./Classroom";

interface Student {
    firstName: String;
    lastName: String;
    birthDate: Date;
};


export class StudentClass implements Student {

    firstName: String;
    lastName: String;
    birthDate: Date;

    username: String;
    grade: GradeClass = new GradeClass("");
    static numberInstances: number = 0;


    constructor(firstName: String, lastName: String, birthDate: Date) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;


        StudentClass.numberInstances++;
        this.username = generateUsername(this.firstName, this.lastName);
    }


    greet() {
        return "Hello";
    }

    leave() {
        this.grade.leave(this);
    }


    toString() {
        return `Student {
            ${this.firstName},
            ${this.lastName},
            ${this.birthDate},
            ${this.username},
            ${this.grade}
        }`;
    }

}

const generateUsername = (firstName: String, lastName: String) => firstName.substring(0, 1).toLowerCase() + lastName.substring(0, 7).toLowerCase();
