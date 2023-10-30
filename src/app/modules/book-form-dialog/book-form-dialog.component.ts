import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookFormViewModel } from '@core/view-models/book-form.view-model';
import { MainViewModel } from '@core/view-models/main.view-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book, BookDTO } from '@core/interfaces/book.interface';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ds-book-form-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  providers: [
    BookFormViewModel,
  ],
  templateUrl: './book-form-dialog.component.html',
  styleUrls: ['./book-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookFormDialogComponent implements OnInit {

  form: FormGroup<{
    title: FormControl<string>;
    author: FormControl<string>;
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

    if (this.data)
      this.form.patchValue(this.data);
  }

  submit(): void {
    if (this.data) {
      this.mainViewModel.editBook(this.data?.id, this.form?.value as Book);
    } else {
      this.mainViewModel.addBook(this.form?.value as Book);
    }
    this.form.reset();
    this.dialogRef.close();
  }
}
