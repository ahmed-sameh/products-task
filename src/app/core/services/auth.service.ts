import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from './http.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  userAuthenticated = new BehaviorSubject<User | null>(null);
  userInLogMood = false;

  constructor(private router: Router, private httpService: ApiService) {}

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
      next: (res) => console.log(res),
    });

    let user = new User(username, password);
    this.userAuthenticated.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.router.navigate(['/welcome']);
    this.userInLogMood = true;
  }

  // funct responsible about auto login when app is intialized by checking if there is user data in local storage
  autoLogin() {
    const userData: { email: string; password: string } = JSON.parse(
      localStorage?.getItem('userData')!
    );
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.password);
    this.userAuthenticated.next(loadedUser);
    this.userInLogMood = true;
  }

  logout() {
    this.userAuthenticated.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
  }
}
