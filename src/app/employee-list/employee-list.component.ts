import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { Employee } from '../shared/employee';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'update', 'delete'];
  dataSource: Employee[] = [
    { id: 1, firstName: "Anna", lastName: "Czarnecka", email: "czarnecka.anna@gmail.com" },
    { id: 1, firstName: "Anna", lastName: "Czarnecka", email: "czarnecka.anna@gmail.com" },
    { id: 1, firstName: "Anna", lastName: "Czarnecka", email: "czarnecka.anna@gmail.com" },
  ]
  isLoggedIn = false;


  constructor(private employeeService: EmployeeService, private router: Router, private authenticationService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    if (this.isLoggedIn) {
      this.getEmployees();
    }
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe({ next: (response: Employee[]) => this.dataSource = response });
  }

  editEmployee(employee: Employee): void {
    this.router.navigate(['/employee-changes', employee.id])
  }

  deleteEmployee(employee: Employee): void {
    this.employeeService.deleteEmployee(employee.id).subscribe({
      next: () => {
        this.getEmployees();
      }
    });
  }

  handleLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
