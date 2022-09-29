import { GradeClass } from "./Classroom";

export interface Student {
    firstName: String;
    lastName: String;
    birthDate: Date;
};


export class StudentClass implements Student {

    firstName: String;
    lastName: String;
    birthDate: Date;

    username: String;
    private _grade: GradeClass = new GradeClass("");
    public get grade(): GradeClass {
        return this._grade;
    }
    public set grade(value: GradeClass) {
        this._grade = value === null ? this.grade : value;
    }
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
        this._grade.leave(this);
    }


    toString() {
        return `Student {
            ${this.firstName},
            ${this.lastName},
            ${this.birthDate},
            ${this.username},
            ${this._grade}
        }`;
    }

}

const generateUsername = (firstName: String, lastName: String) => firstName.substring(0, 1).toLowerCase() + lastName.substring(0, 7).toLowerCase();
