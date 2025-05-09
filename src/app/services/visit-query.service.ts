import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Visitor4 } from '../model/visit-quiries';

@Injectable({
  providedIn: 'root'
})
export class VisitQueryService {

  private baseUrl = 'http://localhost:8080/query/getQuery';

  constructor(private http: HttpClient) {}

  // Create new query
  addQuery(visitor: Visitor4): Observable<Visitor4> {
    return this.http.post<Visitor4>(this.baseUrl, visitor).pipe(
      catchError(this.handleError)
    );
  }

  // Get all visit queries
  getQueries(): Observable<Visitor4[]> {
    return this.http.get<Visitor4[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Get a query by ID
  getQueryById(id: number): Observable<Visitor4> {
    return this.http.get<Visitor4>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Update a query
  updateQuery(id: number, visitor: Visitor4): Observable<Visitor4> {
    return this.http.put<Visitor4>(`${this.baseUrl}/${id}`, visitor).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a query
  deleteQuery(id: number): Observable<void> {
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