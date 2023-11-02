import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '@core/constants/Api.const';
import { Author, AuthorDTO } from '@core/interfaces/book.interface';
import { ServiceResponse } from '@core/interfaces/service-response.interface';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private http = inject(HttpClient);

  get(): Observable<ServiceResponse<AuthorDTO[]>> {
    return this.http.get<ServiceResponse<AuthorDTO[]>>(`${environment.httpBackendPersonal}${API.AUTHORS}`);
  }

  add(author: Author): Observable<ServiceResponse<AuthorDTO>> {
    return this.http.post<ServiceResponse<AuthorDTO>>(`${environment.httpBackendPersonal}${API.AUTHORS}`, author);
  }

  delete(id: number): Observable<ServiceResponse<AuthorDTO>> {
    return this.http.delete<ServiceResponse<AuthorDTO>>(`${environment.httpBackendPersonal}${API.AUTHORS_ID.replace(":id", id.toString())}`);
  }

  put(author: AuthorDTO): Observable<ServiceResponse<AuthorDTO>> {
    return this.http.put<ServiceResponse<AuthorDTO>>(`${environment.httpBackendPersonal}${API.AUTHORS_ID.replace(":id", author?.id.toString())}`, author);
  }
}
