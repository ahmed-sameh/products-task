import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('loginForm') LoginForm!: NgForm;
  @ViewChild('passRef') passInput!: NgModel;
  @ViewChild('mailRef') mailInput!: NgModel;
  authSub?: Subscription;
  userNotExist = false;
  password = '';
  email = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // this code check if the user is authenticated is auto navigate to welcome page
    if (this.authService.userInLogMood) {
      this.router.navigate(['/welcome']);
    }
  }

  onLogin() {
    let email = this.LoginForm.value.email;
    let password = this.LoginForm.value.password;

    this.authService.login(email, password);

    this.authSub = this.authService.userAuthenticated.subscribe({
      next: (isAuth: any) => {
        if (isAuth) {
          this.userNotExist = false;
        } else {
          this.userNotExist = true;
        }
      },
    });

    this.LoginForm.reset();
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
