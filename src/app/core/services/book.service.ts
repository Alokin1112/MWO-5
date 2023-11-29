import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API } from '@core/constants/Api.const';
import { Book, BookDTO, EditableBook } from '@core/interfaces/book.interface';
import { PaginableResponse, Pagination } from '@core/interfaces/pagination.interface';
import { ServiceResponse } from '@core/interfaces/service-response.interface';
import { AUTHORS_MOCK } from '@core/mocks/authors.mock';
import { BOOKS_MOCK } from '@core/mocks/books.mock';
import { MOCK_SERVICE_RESPONSE_SUCCESS } from '@core/mocks/service-response.mock';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private http = inject(HttpClient);
  private Books = BOOKS_MOCK;

  get(pagination: Pagination): Observable<ServiceResponse<PaginableResponse<BookDTO[]>>> {
    return of(MOCK_SERVICE_RESPONSE_SUCCESS({ data: this.Books, pageCount: 1 }));
    const params = new HttpParams().append('page', pagination.page).append('take', pagination.take);

    return this.http.get<ServiceResponse<PaginableResponse<BookDTO[]>>>(`${environment.httpBackendPersonal}${API.BOOKS}`, { params });
  }

  getById(id: number): Observable<ServiceResponse<BookDTO>> {
    return of(MOCK_SERVICE_RESPONSE_SUCCESS(this.Books.find((book) => book?.id == id)));
    return this.http.get<ServiceResponse<BookDTO>>(`${environment.httpBackendPersonal}${API.BOOKS}/${id}`,);
  }

  add(book: EditableBook): Observable<ServiceResponse<BookDTO>> {
    const b: BookDTO = {
      ...book,
      author: AUTHORS_MOCK.find(({ id }) => id == book.author_id),
      id: Math.floor(Math.random() * 1000),
    }
    this.Books = [b, ...this.Books];
    return of(MOCK_SERVICE_RESPONSE_SUCCESS(b));
    return this.http.post<ServiceResponse<BookDTO>>(`${environment.httpBackendPersonal}${API.BOOKS}`, book);
  }

  delete(id: number): Observable<ServiceResponse<BookDTO>> {
    const bIndex = this.Books.findIndex((book) => book?.id == id);
    const b = this.Books[bIndex];
    this.Books.splice(bIndex, 1);
    return of(MOCK_SERVICE_RESPONSE_SUCCESS(b));
    return this.http.delete<ServiceResponse<BookDTO>>(`${environment.httpBackendPersonal}${API.BOOKS_ID.replace(":id", id.toString())}`);
  }

  put(book: EditableBook, id: number): Observable<ServiceResponse<BookDTO>> {
    const bIndex = this.Books.findIndex((book) => book?.id == id);
    const b: BookDTO = {
      ...book,
      author: AUTHORS_MOCK.find(({ id }) => id == book.author_id),
      id,
    };
    this.Books.splice(bIndex, 1, b);
    return of(MOCK_SERVICE_RESPONSE_SUCCESS(b));
    return this.http.put<ServiceResponse<BookDTO>>(`${environment.httpBackendPersonal}${API.BOOKS_ID.replace(":id", id.toString())}`, book);
  }
}
