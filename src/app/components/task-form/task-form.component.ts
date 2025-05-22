import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../app.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<Task>();
  constructor(private toastr: ToastrService) {}

  display: boolean = false;
  title: string = '';
  description: string = '';
  status: boolean = false;

  openDialog() {
    this.display = true;
  }

  closeDialog() {
    this.display = false;
  }

  saveTask() {
    if (!this.title.trim() || !this.description.trim()) {
      this.toastr.error('Please fill in all fields', 'Missing Data');
      return;
    }
  
    const newTask: Task = {
      id: Date.now(),
      title: this.title,
      description: this.description,
      status: this.status,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  
    this.toastr.success(`<i class="fa fa-check-circle"></i> Task added successfully!`, 'Success');
    this.taskAdded.emit(newTask);
  
    // Clear and close
    this.title = '';
    this.description = '';
    this.status = false;
    this.closeDialog();
  }
  
}
