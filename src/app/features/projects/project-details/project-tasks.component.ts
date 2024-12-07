import { Component, Input } from '@angular/core';

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: Date;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

@Component({
  selector: 'app-project-tasks',
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900">Tasks</h3>
        <button 
          (click)="addTask()"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Task
        </button>
      </div>

      <div class="space-y-4">
        <div *ngFor="let task of tasks" 
             class="p-4 border rounded-lg hover:bg-gray-50">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <input 
                type="checkbox" 
                [checked]="task.status === 'completed'"
                (change)="toggleTaskStatus(task)"
                class="h-4 w-4 text-blue-600 rounded">
              <div>
                <p class="font-medium" [class.line-through]="task.status === 'completed'">
                  {{task.title}}
                </p>
                <p class="text-sm text-gray-500">
                  Due: {{task.dueDate | date}} • Assigned to: {{task.assignedTo}}
                </p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <span [class]="getPriorityClass(task.priority)" class="px-2 py-1 rounded-full text-xs">
                {{task.priority}}
              </span>
              <button 
                (click)="editTask(task)"
                class="text-blue-600 hover:text-blue-800">
                <i class="fas fa-edit"></i>
              </button>
              <button 
                (click)="deleteTask(task)"
                class="text-red-600 hover:text-red-800">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProjectTasksComponent {
  @Input() projectId: string = '';
  tasks: Task[] = [];

  addTask() {
    // Implement add task logic
  }

  editTask(task: Task) {
    // Implement edit task logic
  }

  deleteTask(task: Task) {
    // Implement delete task logic
  }

  toggleTaskStatus(task: Task) {
    task.status = task.status === 'completed' ? 'pending' : 'completed';
    // Update task status in backend
  }

  getPriorityClass(priority: string): string {
    const classes = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return classes[priority] || classes.low;
  }
}