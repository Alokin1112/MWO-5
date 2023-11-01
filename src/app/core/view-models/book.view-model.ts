import { BookDTO } from "@core/interfaces/book.interface";
import { PaginableResponse } from "@core/interfaces/pagination.interface";
import { ServiceResponse } from "@core/interfaces/service-response.interface";
import { Observable } from "rxjs";


export class BookViewModel {

  private books$: Observable<ServiceResponse<PaginableResponse<BookDTO[]>>>;

  get books(): Observable<ServiceResponse<PaginableResponse<BookDTO[]>>> {
    return this.books$;
  }

  set books(val: Observable<ServiceResponse<PaginableResponse<BookDTO[]>>>) {
    this.books$ = val;
  }
}