import { Component, Input } from '@angular/core';
import { StorageService } from '../../../core/services/storage.service';

interface ProjectFile {
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
  url: string;
}

@Component({
  selector: 'app-project-files',
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900">Project Files</h3>
        <button 
          (click)="uploadFile()"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Upload File
        </button>
      </div>

      <div class="space-y-4">
        <div *ngFor="let file of files" 
             class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
          <div class="flex items-center space-x-4">
            <i class="fas fa-file text-gray-400 text-2xl"></i>
            <div>
              <p class="font-medium">{{file.name}}</p>
              <p class="text-sm text-gray-500">
                {{file.size | fileSize}} • {{file.uploadedAt | date:'short'}}
              </p>
            </div>
          </div>
          <div class="flex space-x-2">
            <button 
              (click)="downloadFile(file)"
              class="text-blue-600 hover:text-blue-800">
              <i class="fas fa-download"></i>
            </button>
            <button 
              (click)="deleteFile(file)"
              class="text-red-600 hover:text-red-800">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProjectFilesComponent {
  @Input() projectId: string = '';
  files: ProjectFile[] = [];

  constructor(private storageService: StorageService) {}

  uploadFile() {
    // Implement file upload logic
  }

  downloadFile(file: ProjectFile) {
    window.open(file.url, '_blank');
  }

  deleteFile(file: ProjectFile) {
    if (confirm('Are you sure you want to delete this file?')) {
      // Implement file deletion logic
    }
  }
}