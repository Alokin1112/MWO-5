import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthorDTO, BookDTO, BookEditData, EditableBook } from '@core/interfaces/book.interface';
import { MatSelectModule } from '@angular/material/select';
import { ServiceResponse } from '@core/interfaces/service-response.interface';
import { Observable } from 'rxjs';
import { AuthorsService } from '@core/services/authors.service';

@Component({
  selector: 'ds-book-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule],
  templateUrl: './book-form-dialog.component.html',
  styleUrls: ['./book-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormDialogComponent implements OnInit {

  @Input() set data(val: BookDTO) {
    if (val) {
      this.form.patchValue(val as unknown);
      this.form.get('author_id').patchValue(val.author?.id || 0);
    }
  }
  @Output() lzBookChange = new EventEmitter<EditableBook>();

  authors$: Observable<ServiceResponse<AuthorDTO[]>>;

  form = this._fb.group({
    title: ['', [Validators.required]],
    author_id: [null as number, [Validators.required]],
    pageCount: [null as number, [Validators.required]],
    price: [null as number, [Validators.required]],
    photoUrl: ['', [Validators.required]],
  });

  constructor(
    private _fb: FormBuilder,
    private authorsService: AuthorsService,
  ) { }

  ngOnInit(): void {
    this.authors$ = this.authorsService.get();

  }

  submit(): void {
    this.lzBookChange.emit(this.form?.value as unknown as EditableBook);
    this.form.reset();
  }
}
