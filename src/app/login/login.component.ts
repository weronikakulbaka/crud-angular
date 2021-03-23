import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  error!: string | null;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService) { }

  ngOnInit() {
  }

  handleLogin(): void {
    if (this.form.valid) {
      this.authenticationService.authenticationService(this.form.value.username, this.form.value.password).subscribe({
        next: () => {
          this.router.navigate(['/employees']);
        },
        error: () => {
          this.error = 'Nieprawidłowa nazwa użytkownika lub hasło'
        }
      });
    } else {
      this.error = 'Wprowadź poprawne dane'
    }

  }


  submit() {
    this.error = null;
    if (this.form.valid) {
    } else {
      this.error = 'Nieprawidłowa nazwa użytkownika lub hasło'
    }
  }


}
