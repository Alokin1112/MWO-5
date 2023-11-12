import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
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

  authors$: Observable<ServiceResponse<AuthorDTO[]>>;

  form = this._fb.group({
    title: ['', [Validators.required]],
    author_id: [null as number, [Validators.required]],
    pageCount: [null as number, [Validators.required]],
    price: [null as number, [Validators.required]],
    photoUrl: ['', [Validators.required]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BookDTO,
    public dialogRef: MatDialogRef<BookFormDialogComponent>,
    private _fb: FormBuilder,
    private authorsService: AuthorsService,
  ) { }

  ngOnInit(): void {
    this.authors$ = this.authorsService.get();

    if (this.data) {
      this.form.patchValue(this.data as unknown);
      this.form.get('author_id').patchValue(this?.data?.author?.id || 0);
    }
  }

  submit(): void {
    this.dialogRef.close({ book: this.form?.value as unknown as EditableBook, id: this.data?.id || null } as BookEditData);

    this.form.reset();
  }
}
