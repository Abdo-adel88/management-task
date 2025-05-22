import { Component, signal } from '@angular/core';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TaskFormComponent,
    TaskListComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'task';
  tasks = signal<Task[]>([]);

  constructor() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      this.tasks.set(JSON.parse(saved));
    }
  }

  onTaskAdded(task: Task) {
    const updated = [...this.tasks(), task];
    this.tasks.set(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
  }

  onTasksChanged(updatedTasks: Task[]) {
    this.tasks.set(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }
  get taskList() {
    return this.tasks(); 
  }
}
