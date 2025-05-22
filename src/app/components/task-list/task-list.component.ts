import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, EditTaskDialogComponent, ConfirmDeleteDialogComponent,DragDropModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaskListComponent {
  @Input() tasks: any[] = [];
  @Output() tasksChanged = new EventEmitter<any[]>();
  constructor(private toastr: ToastrService) {}
  // Delete Dialog
  selectedTaskIndex: number | null = null;
  showConfirmDialog: boolean = false;

  // Edit Dialog
  showEditDialog = false;
  taskBeingEdited: any = null;
  filter: 'all' | 'completed' | 'notCompleted' = 'all';

  drop(event: CdkDragDrop<any[]>) {
    if (this.filter !== 'all') return;
  
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.tasksChanged.emit(this.tasks);
  }
  get filteredTasks() {
    return this.tasks.filter(task => {
      if (this.filter === 'completed') {
        return task.status === true;
      } else if (this.filter === 'notCompleted') {
        return task.status === false;
      }
      return true; // 'all'
    });
  }
  
  deleteTask(index: number) {
    this.openConfirmDialog(index);
  }

  openConfirmDialog(index: number) {
    this.selectedTaskIndex = index;
    this.showConfirmDialog = true;
  }

  confirmDelete() {
    if (this.selectedTaskIndex !== null) {
      this.tasks.splice(this.selectedTaskIndex, 1);
      this.tasksChanged.emit(this.tasks);
      this.selectedTaskIndex = null;
      this.showConfirmDialog = false;
      this.toastr.success(  `<i class="fa fa-trash"></i> Task deleted successfully!`,
        'Deleted');
    }
  }

  cancelDelete() {
    this.selectedTaskIndex = null;
    this.showConfirmDialog = false;
  }

  editTask(task: any) {
    this.taskBeingEdited = task;
    this.showEditDialog = true;
  }

  onSaveEditedTask(updatedTask: any) {
    Object.assign(this.taskBeingEdited, updatedTask);
    this.taskBeingEdited.updatedAt = new Date();
    this.taskBeingEdited = null;
    this.showEditDialog = false;
    this.tasksChanged.emit(this.tasks);
    this.toastr.success(  `<i class="fa fa-check-circle"></i> Task updated successfully!`,
      'Updated');
  }

  onCancelEdit() {
    this.taskBeingEdited = null;
    this.showEditDialog = false;
  }
}
