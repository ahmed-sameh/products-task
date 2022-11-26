import { Component, OnInit } from '@angular/core';
import { ALERT } from 'src/app/core/models/alert.model';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  showAlert = false;
  isError = false;
  alertdata: ALERT = {};
  alertMessage = '';
  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.showAlert.subscribe((alert: any) => {
      if (alert) {
        this.showAlert = true;
        this.isError = alert.type === 'error';
        this.alertdata = alert;
        this.alertMessage = alert.message;
      }
    });
  }

  closeAlert() {
    this.showAlert = false;
  }
}
