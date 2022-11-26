import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  constructor(
    private loaderService: LoadingService,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      // in case of the request is done but there is other requests i will remove the requwst from the requests queu only
      this.requests.splice(i, 1);
    }
    if (this.requests.length === 0) {
      // iff all requests is done i will hide the loader from the screen
      this.loaderService.isLoading.next(false);
    }
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req.clone({});
    // here i handle loading service to show loader on screen to user
    this.requests.push(req);
    this.loaderService.isLoading.next(true);

    // if token exits will be added to request headers
    if (this.authService.getToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      });
    }

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            if (event.status === 200) {
              this.removeRequest(req);
            } else if (event.status === 403 || event.status === 401) {
              // if user unauthenticated or token expired i will navogate him to the auth page
              this.authService.logout();
              this.authService.userAuthenticated.next(null);
              this.removeRequest(req);
            }
          }
        },
        (err: any) => {
          // here i handle and error and show it to user by alert service
          this.alertService.showAlert.next({
            type: 'error',
            message: err.error.message,
          });
          this.removeRequest(req);

          if (err instanceof HttpErrorResponse) {
            // if user unauthenticated or token expired i will navogate him to the auth page

            if (err.error.message === 'Unauthenticated') {
              this.authService.logout();
              this.authService.userAuthenticated.next(null);
            }
            if (err.status == 403) {
              this.authService.logout();
              this.authService.userAuthenticated.next(null);
              this.removeRequest(req);
            }
          }
          this.removeRequest(req);

          return of(err);
        }
      )
    );
  }
}
