import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthorDTO, BookDTO, EditableBook } from '@core/interfaces/book.interface';
import { BookFormViewModel } from '@core/view-models/book-form.view-model';
import { MainViewModel } from '@core/view-models/main.view-model';
import { MatSelectModule } from '@angular/material/select';
import { ServiceResponse } from '@core/interfaces/service-response.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'ds-book-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule],
  providers: [
    BookFormViewModel,
  ],
  templateUrl: './book-form-dialog.component.html',
  styleUrls: ['./book-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormDialogComponent implements OnInit {

  authors$: Observable<ServiceResponse<AuthorDTO[]>>;

  form: FormGroup<{
    title: FormControl<string>;
    author_id: FormControl<number>;
    pageCount: FormControl<number>;
    price: FormControl<number>;
    photoUrl: FormControl<string>;
  }>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BookDTO,
    public dialogRef: MatDialogRef<BookFormDialogComponent>,
    private bookFormViewModel: BookFormViewModel,
    private mainViewModel: MainViewModel,
  ) { }

  ngOnInit(): void {
    this.form = this.bookFormViewModel.form;
    this.authors$ = this.bookFormViewModel.authors$;

    if (this.data) {
      this.form.patchValue(this.data as unknown);
      this.form.get('author_id').patchValue(this?.data?.author?.id || 0)
    }
  }

  submit(): void {
    if (this.data) {
      this.mainViewModel.editBook(this.form?.value as unknown as EditableBook, this.data?.id,);
    } else {
      this.mainViewModel.addBook(this.form?.value as unknown as EditableBook);
    }
    this.form.reset();
    this.dialogRef.close();
  }
}
