import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../app.component';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<Task>();
  display: boolean = false;

  taskForm!: FormGroup;

  constructor(private toastr: ToastrService, private fb: FormBuilder) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: [false]
    });
  }

  openDialog() {
    this.display = true;
  }

  closeDialog() {
    this.display = false;
    this.taskForm.reset({ status: false }); // reset form
  }

  saveTask() {
    if (this.taskForm.invalid) {
      this.toastr.error('Please fill in all fields', 'Missing Data');
      return;
    }

    const formValue = this.taskForm.value;

    const newTask: Task = {
      id: Date.now(),
      title: formValue.title.trim(),
      description: formValue.description.trim(),
      status: formValue.status,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.toastr.success(
      `<i class="fa fa-check-circle"></i> Task added successfully!`,
      'Success'
    );
    this.taskAdded.emit(newTask);
    this.closeDialog();
  }
}

