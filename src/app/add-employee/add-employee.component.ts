import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Employee } from '../shared/employee';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  addEmployeeFormGroup: FormGroup = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email,]),
    nameFormControl: new FormControl('', [Validators.required]),
    surnameFormControl: new FormControl('', [Validators.required])
  })

  get emailFormControl() { return this.addEmployeeFormGroup.get('emailFormControl'); }
  get nameFormControl() { return this.addEmployeeFormGroup.get('nameFormControl'); }
  get surnameFormControl() { return this.addEmployeeFormGroup.get('surnameFormControl'); }

  urlParameter!: number;

  constructor(private employeeService: EmployeeService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.urlParameter = params.action;
      }
    )

    if (this.urlParameter != 0) {
      this.employeeService.getEmployee(this.urlParameter).subscribe({
        next: (response: Employee) => {
          this.addEmployeeFormGroup.patchValue({
            emailFormControl: response.email,
            nameFormControl: response.firstName,
            surnameFormControl: response.lastName
          })
        },
        error: error => console.log(error)
      })
    }
  }


  employeeChanges(): void {
    const employee: Employee = {
      firstName: this.nameFormControl?.value,
      lastName: this.surnameFormControl?.value,
      email: this.emailFormControl?.value
    }

    if (this.urlParameter == 0) {
      this.addEmployee(employee);
    } else {
      this.editEmployee(employee);
    }
  }

  addEmployee(employee: Employee): void {

    this.employeeService.addEmployee(employee).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: error => console.log(error)
    })

  }

  editEmployee(employee: Employee): void {
    this.employeeService.editEmployee(employee, this.urlParameter).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: error => console.log(error)
    })
  }

}
