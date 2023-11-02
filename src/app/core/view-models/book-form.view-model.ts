import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthorDTO } from "@core/interfaces/book.interface";
import { ServiceResponse } from "@core/interfaces/service-response.interface";
import { AuthorsService } from "@core/services/authors.service";
import { Observable } from "rxjs";

@Injectable()
export class BookFormViewModel {


  constructor(private _fb: FormBuilder, private authorsService: AuthorsService) { }

  get form() {
    return this._fb.group({
      title: ['', [Validators.required]],
      author_id: [null as number, [Validators.required]],
      pageCount: [null as number, [Validators.required]],
      price: [null as number, [Validators.required]],
      photoUrl: ['', [Validators.required]],
    });
  }

  get authors$(): Observable<ServiceResponse<AuthorDTO[]>> {
    return this.authorsService.get();
  }
}