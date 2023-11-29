import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EditableBook } from '@core/interfaces/book.interface';
import { BookService } from '@core/services/book.service';
import { BookFormDialogComponent } from '@modules/book-form-dialog/book-form-dialog.component';
import { take } from 'rxjs';

@Component({
  selector: 'ds-add-book',
  standalone: true,
  imports: [
    CommonModule,
    BookFormDialogComponent,
    MatSnackBarModule
  ],
  templateUrl: './addBook.component.html',
  styleUrls: ['./addBook.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBookComponent {

  private bookService = inject(BookService);
  private router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  handleBookAdd(book: EditableBook): void {
    this.bookService.add(book).pipe(
      take(1),
    ).subscribe(() => {
      this._snackBar.open(`Poprawnie dodano książkę ${book?.title}`, null, {
        panelClass: 'mat-success',
        duration: 4000,
      });
      void this.router.navigateByUrl('/home');
    });
  }
}
