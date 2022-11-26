import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from './http.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  userAuthenticated = new BehaviorSubject<User | null>(null);

  constructor(
    private router: Router,
    private httpService: ApiService,
    private localStorageService: LocalStorageService
  ) {}

  /*
    Login function:
      -> take mail & password and authenticate the user;
      -> if user authenticated 
        >> it will save the user data in local storge
        >> send the user data through the subject to all app parts that need this information
        >> navigate to home page
  */
  login(username: string, password: string) {
    const userData = {
      username,
      password,
    };
    this.httpService.post('auth/login', userData).subscribe({
      next: (res) => {
        this.userAuthenticated.next(res);
        this.localStorageService.saveUser(res);
        this.router.navigate(['/home']);
      },
    });
  }

  // funct responsible about auto login when app is intialized by checking if there is user data in local storage
  autoLogin() {
    if (this.localStorageService.getUser()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  logout() {
    this.userAuthenticated.next(null);
    this.router.navigate(['/auth']);
    this.localStorageService.destroyUser();
  }

  isUserAuthenticated() {
    return this.localStorageService.getUser() ? true : false;
  }

  getToken() {
    return this.localStorageService.getUser()
      ? this.localStorageService.getUser().token
      : '';
  }
}
