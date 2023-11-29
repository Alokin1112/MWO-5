import { ServiceResponse } from './../interfaces/service-response.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '@core/constants/Api.const';
import { AuthRequest, AuthResponse } from '@core/interfaces/auth.interface';
import { AUTH_RESPONSE } from '@core/mocks/auth-response.mock';
import { environment } from '@env/environment';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  register(user: AuthRequest): Observable<AuthResponse> {
    return of(AUTH_RESPONSE);
    return this.http.post<ServiceResponse<AuthResponse>>(`${environment.httpBackendPersonal}${API.REGISTER}`, user).pipe(
      map((res) => res?.data)
    );
  }

  login(user: AuthRequest): Observable<AuthResponse> {
    return of(AUTH_RESPONSE);
    return this.http.post<ServiceResponse<AuthResponse>>(`${environment.httpBackendPersonal}${API.LOGIN}`, user).pipe(
      map((res) => res?.data)
    );
  }

  get token(): string {
    return window.localStorage.getItem("AUTH_TOKEN") || null;
  }

  set token(val: string) {
    window.localStorage.setItem("AUTH_TOKEN", val);
  }

}
