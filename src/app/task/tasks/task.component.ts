import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
import { Task } from '../../model/task.model';
import {UpdateTaskStatusRequest} from "../../model/UpdateTaskStatusRequest";

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

    tasks: Task[] = [];
    tasksToDisplay: Task[] = [];
    idUser: number = 0;
    currentPage: number = 1;
    itemsPerPage: number = 6;
    totalItems: number = 0;
    selectedTaskIds: number[] = [];
    isModalOpen: boolean = false;
    selectedTask: Task = new Task();

    constructor(
        private taskService: TaskService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.userService.getCurrentlyLoggedInUser().subscribe(user => {
            this.idUser = user.id;
            this.loadTasks();
        });
    }

    loadTasks(): void {
        this.taskService.getTasksByUserId(this.idUser).subscribe(tasks => {
            this.tasks = tasks;
            this.totalItems = tasks.length;
            this.updateTasksToDisplay();
        });
    }
    updateTasksToDisplay(): void {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        this.tasksToDisplay = this.tasks.slice(start, end);
    }
    modifyTask(id: number): void {
        console.log(`Modifying task with ID: ${id}`);
    }
    changePage(event: any): void {
        this.currentPage = event.page;
        this.updateTasksToDisplay();
    }

    previousPage(): void {
        this.currentPage--;
        this.changePage({ page: this.currentPage });
    }

    nextPage(): void {
        this.currentPage++;
        this.changePage({ page: this.currentPage });
    }
    updateSelectedTasks(taskId: number | undefined, event: any): void {
        if (taskId === undefined) {
            console.error("Task ID is undefined!");
            return;
        }
        console.log("Task ID:", taskId, "Checked:", event.target.checked);

        if (event.target.checked) {
            this.selectedTaskIds.push(taskId);
        } else {
            const index = this.selectedTaskIds.indexOf(taskId);
            if (index > -1) {
                this.selectedTaskIds.splice(index, 1);
            }
        }
    }

    massUpdateTaskStatus(newStatus: string): void {
        const request = new UpdateTaskStatusRequest();
        request.taskIds = this.selectedTaskIds;
        request.status = newStatus;
        console.log("Updating task status with request:", JSON.stringify(request));
        this.taskService.updateTasksStatus(request).subscribe(() => {
            this.loadTasks();
            this.selectedTaskIds = [];
        });
    }

    massDeleteTasks(): void {
        console.log("Deleting tasks with IDs:", JSON.stringify(this.selectedTaskIds));
        this.taskService.deleteTasksMassive(this.selectedTaskIds).subscribe(() => {
            this.loadTasks();
            this.selectedTaskIds = [];
        });
    }
    openModal(task: Task): void {
        this.selectedTask = { ...task };
        this.isModalOpen = true;
    }

    handleTaskUpdate(updatedTask: Task): void {
        this.taskService.updateTask(updatedTask.id!, updatedTask).subscribe(() => {
            this.loadTasks();
            this.isModalOpen = false;
        });
    }
}
