import { BookDTO } from "@core/interfaces/book.interface";
import { ServiceResponse } from "@core/interfaces/service-response.interface";
import { Observable } from "rxjs";


export class BookViewModel {

  private books$: Observable<ServiceResponse<BookDTO[]>>;

  get books(): Observable<ServiceResponse<BookDTO[]>> {
    return this.books$;
  }

  set books(val: Observable<ServiceResponse<BookDTO[]>>) {
    this.books$ = val;
  }
}