import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private apiUrl = `${environment.apiUrl}/storage`;

  constructor(private http: HttpClient) {}

  uploadFile(file: File, path: string): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path);

    return this.http.post<{ url: string }>(`${this.apiUrl}/upload`, formData);
  }

  deleteFile(path: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${encodeURIComponent(path)}`);
  }

  getSignedUrl(path: string): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(`${this.apiUrl}/signed-url/${encodeURIComponent(path)}`);
  }
}