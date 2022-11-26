import { Component } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-load-spinner',
  templateUrl: './load-spinner.component.html',
  styleUrls: ['./load-spinner.component.css'],
})
export class LoadSpinnerComponent {
  loading: boolean = true;

  constructor(private loaderService: LoadingService) {
    this.loaderService.isLoading.subscribe((v) => {
      this.loading = v;
    });
  }
}
