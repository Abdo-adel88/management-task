import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-task-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent {
  @Input() task: any;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  editedTask: any = {};

  ngOnChanges() {
    // نعمل نسخة محلية علشان نعدل عليها بدون ما نأثر على الأصل مباشرة
    this.editedTask = { ...this.task };
  }

  saveChanges() {
    this.save.emit(this.editedTask);
  }

  cancelEdit() {
    this.cancel.emit();
  }
  isTaskModified(): boolean {
    return (
      this.task.title.trim() !== this.editedTask.title.trim() ||
      this.task.description.trim() !== this.editedTask.description.trim() ||
      this.task.status !== this.editedTask.status
    );
  }
  
}
