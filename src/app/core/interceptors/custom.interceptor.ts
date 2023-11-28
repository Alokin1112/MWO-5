
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { environment } from '@env/environment';
import { Observable, catchError } from 'rxjs';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  private authService = inject(AuthService);
  private router = inject(Router);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clone = req.clone();
    const token = this.authService.token;

    console.log(token);

    if (clone.url.startsWith(environment.httpBackendPersonal) && token) {
      clone = clone.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
        }
      });
    }
    return clone.url.startsWith(environment.httpBackendPersonal) && token ? next.handle(clone).pipe(
      catchError((res: HttpErrorResponse) => {
        if (res.status == 403) {
          this.authService.token = null;
          void this.router.navigateByUrl('/login');
        }

        return next.handle(clone);
      })
    ) : next.handle(clone);
  }
}