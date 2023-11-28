import { ServiceResponse } from './../interfaces/service-response.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '@core/constants/Api.const';
import { AuthRequest, AuthResponse } from '@core/interfaces/auth.interface';
import { environment } from '@env/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string;

  private http = inject(HttpClient);

  register(user: AuthRequest): Observable<AuthResponse> {
    return this.http.post<ServiceResponse<AuthResponse>>(`${environment.httpBackendPersonal}${API.REGISTER}`, user).pipe(
      map((res) => res?.data)
    );
  }

  login(user: AuthRequest): Observable<AuthResponse> {
    return this.http.post<ServiceResponse<AuthResponse>>(`${environment.httpBackendPersonal}${API.LOGIN}`, user).pipe(
      map((res) => res?.data)
    );
  }

  get token(): string {
    return this._token;
  }

  set token(val: string) {
    this._token = val;
  }

}
