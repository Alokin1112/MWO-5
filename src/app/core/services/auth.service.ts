import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '@core/constants/Api.const';
import { AuthRequest, AuthResponse } from '@core/interfaces/auth.interface';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string;

  private http = inject(HttpClient);

  register(user: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.httpBackendPersonal}${API.REGISTER}`, user);
  }

  login(user: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.httpBackendPersonal}${API.LOGIN}`, user);
  }

  get token(): string {
    return this._token;
  }

  set token(val: string) {
    this._token = val;
  }

}
