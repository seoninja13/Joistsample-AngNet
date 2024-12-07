import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ErrorMessage {
  message: string;
  type: 'error' | 'warning' | 'info';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSubject = new Subject<ErrorMessage>();
  errors$ = this.errorSubject.asObservable();

  handleError(error: any) {
    const errorMessage: ErrorMessage = {
      message: error.message || 'An unexpected error occurred',
      type: 'error',
      timestamp: new Date()
    };
    this.errorSubject.next(errorMessage);
    console.error('Error:', error);
  }

  showWarning(message: string) {
    this.errorSubject.next({
      message,
      type: 'warning',
      timestamp: new Date()
    });
  }

  showInfo(message: string) {
    this.errorSubject.next({
      message,
      type: 'info',
      timestamp: new Date()
    });
  }
}