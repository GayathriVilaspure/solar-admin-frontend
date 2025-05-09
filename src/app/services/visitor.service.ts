import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Visitor3 } from '../model/Status_installation';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  private apiUrl = 'http://localhost:8080//visit'; // Ensure this matches your backend endpoint

  constructor(private http: HttpClient) {}

  // ✅ Get all visitors
  getVisitors(): Observable<Visitor3[]> {
    return this.http.get<Visitor3[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Create a new visitor
  createVisitor(visitor: Visitor3): Observable<Visitor3> {
    return this.http.post<Visitor3>(this.apiUrl, visitor).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Get a visitor by ID
  getVisitorById(id: number): Observable<Visitor3> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Visitor3>(url).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Update a visitor
  updateVisitor(id: number, visitor: Visitor3): Observable<Visitor3> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Visitor3>(url, visitor).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Delete a visitor
  deleteVisitor(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  // ✅ Error handler
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
