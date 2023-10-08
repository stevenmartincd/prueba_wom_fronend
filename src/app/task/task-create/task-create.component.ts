import { Component, OnInit } from '@angular/core';
import { Task } from '../../model/task.model';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class AddTaskComponent implements OnInit {

  task: Task = new Task();
  alertMessage: string = '';
    constructor(
      private taskService: TaskService,
      private userService: UserService,
      private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.getCurrentUserId();
  }

  getCurrentUserId(): void {
    this.userService.getCurrentlyLoggedInUser().subscribe(
        (user) => {
          this.task.idUser = user.id;
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
    );
  }

    onSubmit() {
        this.taskService.createTask(this.task).subscribe(
            (response) => {
                console.log('Task created successfully:', response);
                this.alertMessage = this.translate.instant('TASK_CREATE.SUCCESSFULLY');
            },
            (error) => {
                console.error('Error creating task:', error);
                this.alertMessage = this.translate.instant('TASK_CREATE.ERROR')` ${error.message || 'Unknown error'}`;
            }
        );
    }
}
