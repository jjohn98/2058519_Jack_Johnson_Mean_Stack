import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task-tracker';

  headers = ["ID", "Name", "Task", "Deadline"];

  tasks:any = [];

  addTask(taskRef:NgForm)
  {
    let taskForm = taskRef.value;

    if(taskForm.employeeID != "" && taskForm.employeeName != "" && taskForm.employeeTask != "" && taskForm.taskDeadline != "")
    {
      let newTask = {"ID":taskForm.employeeID,"Name":taskForm.employeeName,"Task":taskForm.employeeTask,"Deadline":taskForm.taskDeadline};

      this.tasks[this.tasks.length] = newTask;
    }
    else
    {
      alert("All fields must be filled!");
    }
  }

  resetTasks()
  {
    this.tasks = [];
  }
}
