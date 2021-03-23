import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = 'http://localhost:8080/api/v1/employees';
  constructor(private http: HttpClient, private router: Router) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseURL}`);
  }

  addEmployee(employee: Employee): Observable<any>{
    return this.http.post(`${this.baseURL}`, employee).pipe(
      catchError(response => {
          if (response.status === 500) {
              alert("Wprowadź poprawne dane!");
          }
          return throwError(response);
      })
    );
  }

  getEmployee(id: number): Observable<Employee>{
    return this.http.get<Employee>(`${this.baseURL}/${id}`);
  }

  editEmployee(employee: Employee, id: number): Observable<Employee>{
    return this.http.put<Employee>(`${this.baseURL}/${id}`, employee).pipe(
      catchError(response => {
          if (response.status === 500) {
              alert("Wprowadź poprawne dane!");
          }
          return throwError(response);
      })
    );
  }

  deleteEmployee(id: number | undefined): Observable<any>{
    return this.http.delete<Employee>(`${this.baseURL}/${id}`);
  }
}
