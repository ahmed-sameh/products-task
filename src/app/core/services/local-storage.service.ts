import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  getUser() {
    if (localStorage.getItem('userData')) {
      return JSON.parse(localStorage.getItem('userData')!);
    } else {
      return null;
    }
  }

  saveUser(userData: User) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  destroyUser() {
    localStorage.removeItem('userData');
  }
}
