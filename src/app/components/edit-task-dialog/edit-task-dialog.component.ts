import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-task-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent {
  @Input() task: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  editForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

ngOnChanges() {
  if (this.task) {
    if (!this.editForm) {
      this.editForm = this.fb.group({
        title: [this.task.title || '', Validators.required],
        description: [this.task.description || '', Validators.required],
        status: [this.task.status || false],
      });
    } else {
      this.editForm.patchValue({
        title: this.task.title || '',
        description: this.task.description || '',
        status: this.task.status || false,
      });
    }
  }
}


  saveChanges() {
    if (this.editForm.invalid) return;

    const updatedTask = {
      ...this.task,
      ...this.editForm.value,
      updatedAt: new Date()
    };

    this.save.emit(updatedTask);
  }

  cancelEdit() {
    this.cancel.emit();
  }

  isTaskModified(): boolean {
    if (!this.editForm) return false;
    return (
      this.task.title.trim() !== this.editForm.value.title.trim() ||
      this.task.description.trim() !== this.editForm.value.description.trim() ||
      this.task.status !== this.editForm.value.status
    );
  }
}

