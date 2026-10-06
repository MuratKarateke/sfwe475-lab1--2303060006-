import { addTask, findTask, Task } from "./tasks";

let tasks: Task[] = [];
tasks = addTask(tasks, "Read Chapter 1");


const task1 = findTask(tasks, 1);
if (task1) {
    console.log(task1.title);
}


const task99 = findTask(tasks, 99);
if (task99) {
    console.log(task99.title);
} else {
    console.log("couldnt find task");
}