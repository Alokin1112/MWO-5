import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '@core/constants/Api.const';
import { Book, BookDTO } from '@core/interfaces/book.interface';
import { PaginableResponse, Pagination } from '@core/interfaces/pagination.interface';
import { ServiceResponse } from '@core/interfaces/service-response.interface';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private http = inject(HttpClient);


  get(pagination: Pagination): Observable<ServiceResponse<PaginableResponse<BookDTO[]>>> {
    const params = new HttpParams().append('page', pagination.page).append('take', pagination.take);

    return this.http.get<ServiceResponse<PaginableResponse<BookDTO[]>>>(`${environment.httpBackendPersonal}${API.BOOKS}`, { params });
  }

  add(book: Book): Observable<ServiceResponse<BookDTO>> {
    return this.http.post<ServiceResponse<BookDTO>>(`${environment.httpBackendPersonal}${API.BOOKS}`, book);
  }

  delete(id: number): Observable<ServiceResponse<BookDTO>> {
    return this.http.delete<ServiceResponse<BookDTO>>(`${environment.httpBackendPersonal}${API.BOOKS_ID.replace(":id", id.toString())}`);
  }

  put(book: BookDTO): Observable<ServiceResponse<BookDTO>> {
    return this.http.put<ServiceResponse<BookDTO>>(`${environment.httpBackendPersonal}${API.BOOKS_ID.replace(":id", book?.id.toString())}`, book);
  }
}
