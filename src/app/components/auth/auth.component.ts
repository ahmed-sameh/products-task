import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  @ViewChild('loginForm') LoginForm!: NgForm;
  @ViewChild('passRef') passInput!: NgModel;
  @ViewChild('mailRef') mailInput!: NgModel;
  password = '';
  email = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // this code check if the user is authenticated is auto navigate to Home page
    if (this.authService.isUserAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  onLogin() {
    let email = this.LoginForm.value.email;
    let password = this.LoginForm.value.password;

    this.authService.login(email, password);

    this.LoginForm.reset();
  }
}
