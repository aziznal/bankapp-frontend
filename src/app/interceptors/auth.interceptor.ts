import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AppSettingsService } from '../services/app-settings.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private appSettings: AppSettingsService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.accessToken;

    return next
      .handle(
        req.clone({
          setHeaders: { ...(token && { Authorization: `Bearer ${token}` }) },
        })
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401 && this.authService.isLoggedIn) {
            this.toastrService.error(
              'User session has expired. Please login again.',
              'Session Expired'
            );

            this.appSettings.settings.showLoadingScreen = false;
            this.authService.logout();
          }

          this.appSettings.settings.showLoadingScreen = false;
          return throwError(err);
        })
      );
  }
}
