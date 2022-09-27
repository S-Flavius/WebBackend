import { GradeClass } from './Classroom';
import { StudentClass as StudentClass } from './Student';

let mark: StudentClass = new StudentClass("Mark", "Zuckerberg", new Date("1984-05-14"));
console.log(mark.toString());



let b11b: GradeClass = new GradeClass("b11b");

b11b.addStudent(mark);
b11b.addStudent(new StudentClass("Bill", "Gates", new Date("1955-10-28")));
b11b.addStudent(new StudentClass("Steve", "Jobs", new Date("1955-02-24")));
b11b.addStudent(new StudentClass("Elon", "Musk", new Date("1971-06-28")));
b11b.addStudent(new StudentClass("Jeff", "Bezos", new Date("1964-01-12")));
b11b.addStudent(new StudentClass("Larry", "Page", new Date("1973-03-26")));
b11b.addStudent(new StudentClass("Sergey", "Brin", new Date("1973-08-21")));
b11b.addStudent(new StudentClass("Jack", "Dorsey", new Date("1976-11-19")));

console.log(b11b);

mark.leave();

console.log(b11b);
