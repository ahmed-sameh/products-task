import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ALERT } from '../models/alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  showAlert = new BehaviorSubject<ALERT | null>(null);
  constructor() {}
}
