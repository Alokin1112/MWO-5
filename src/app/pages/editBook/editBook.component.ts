import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDTO, EditableBook } from '@core/interfaces/book.interface';
import { BookService } from '@core/services/book.service';
import { BookFormDialogComponent } from '@modules/book-form-dialog/book-form-dialog.component';
import { Observable, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'ds-edit-book',
  standalone: true,
  imports: [
    CommonModule,
    BookFormDialogComponent,
    MatSnackBarModule,
  ],
  templateUrl: './editBook.component.html',
  styleUrls: ['./editBook.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBookComponent implements OnInit {

  book$: Observable<BookDTO>;
  private bookService = inject(BookService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.book$ = this.route.params.pipe(
      switchMap((res) => this.bookService.getById(res['id'] as number)),
      map((res) => res?.data)
    )
  }

  handleBookEdit(book: EditableBook, id: number): void {
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
