import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estimate } from '../models/estimate.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstimateService {
  private apiUrl = `${environment.apiUrl}/estimates`;

  constructor(private http: HttpClient) {}

  getEstimates(): Observable<Estimate[]> {
    return this.http.get<Estimate[]>(this.apiUrl);
  }

  getEstimate(id: string): Observable<Estimate> {
    return this.http.get<Estimate>(`${this.apiUrl}/${id}`);
  }

  createEstimate(estimate: Partial<Estimate>): Observable<Estimate> {
    return this.http.post<Estimate>(this.apiUrl, estimate);
  }

  updateEstimate(id: string, estimate: Partial<Estimate>): Observable<Estimate> {
    return this.http.put<Estimate>(`${this.apiUrl}/${id}`, estimate);
  }

  deleteEstimate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  generatePdf(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/pdf`, { responseType: 'blob' });
  }

  convertToInvoice(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/convert-to-invoice`, {});
  }
}