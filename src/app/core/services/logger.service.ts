import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(message: string, ...args: any[]) {
    if (!environment.production) {
      console.log(new Date().toISOString(), message, ...args);
    }
  }

  error(message: string, ...args: any[]) {
    console.error(new Date().toISOString(), message, ...args);
  }

  warn(message: string, ...args: any[]) {
    console.warn(new Date().toISOString(), message, ...args);
  }

  info(message: string, ...args: any[]) {
    if (!environment.production) {
      console.info(new Date().toISOString(), message, ...args);
    }
  }
}