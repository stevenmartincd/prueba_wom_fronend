import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent {

  @Input() task: Task = new Task();
  @Output() closeModalEvent = new EventEmitter();
  @Output() updateTaskEvent = new EventEmitter<Task>();

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  updateTask(): void {
    this.updateTaskEvent.emit(this.task);
  }
}
