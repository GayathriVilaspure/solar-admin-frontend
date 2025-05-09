import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Visitor3 } from '../model/Status_installation';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private baseUrl = 'http://localhost:8080/api/consumer';

  constructor(private http: HttpClient) {}

  // Create a new status record
  addStatus(visitor: Visitor3): Observable<Visitor3> {
    return this.http.post<Visitor3>(this.baseUrl, visitor).pipe(
      catchError(this.handleError)
    );
  }

  // Get all installation status records
  getStatuses(): Observable<Visitor3[]> {
    return this.http.get<Visitor3[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Get a status by ID
  getStatusById(id: number): Observable<Visitor3> {
    return this.http.get<Visitor3>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Update a status
  updateStatus(id: number, visitor: Visitor3): Observable<Visitor3> {
    return this.http.put<Visitor3>(`${this.baseUrl}/${id}`, visitor).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a status
  deleteStatus(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Server Error:', error);
    let errorMessage = 'Something went wrong! Please try again.';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}