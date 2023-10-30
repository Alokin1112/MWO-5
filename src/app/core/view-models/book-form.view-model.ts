import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";


@Injectable()
export class BookFormViewModel {


  constructor(private _fb: FormBuilder) { }

  get form() {
    return this._fb.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      pageCount: [null as number, [Validators.required]],
      price: [null as number, [Validators.required]],
      photoUrl: ['', [Validators.required]],
    });
  }
}