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

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

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
          if (err.status === 401) {
            this.authService.logout();
          }

          return throwError(err);
        })
      );
  }
}
