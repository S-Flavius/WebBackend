import { StudentClass } from "./Student";


interface Grade {
    description: String;
    students: StudentClass[];
}

export class GradeClass implements Grade {
    description: String;
    students: StudentClass[];

    addStudent(student: StudentClass) {
        this.students.push(student);
        student.grade = this;
    }

    leave(student: StudentClass) {
        this.students = this.students.filter(s => s !== student);
        student.grade = new GradeClass("");
    }

    constructor(description: String) {
        this.description = description;
        this.students = [];
    }

    toString() {
        return `Grade {
            ${this.description},
            {${this.students}
        }`;
    }

}
