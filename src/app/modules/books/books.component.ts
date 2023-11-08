import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BookDTO, BookEditData, EditableBook } from '@core/interfaces/book.interface';
import { PaginableResponse, Pagination } from '@core/interfaces/pagination.interface';
import { ServiceResponse } from '@core/interfaces/service-response.interface';
import { BookService } from '@core/services/book.service';
import { MainViewModel } from '@core/view-models/main.view-model';
import { BookFormDialogComponent } from '@modules/book-form-dialog/book-form-dialog.component';
import { BooksItemComponent } from '@modules/books-item/books-item.component';
import { PaginationComponent } from '@modules/pagination/pagination.component';
import { BehaviorSubject, Observable, filter, map, switchMap, take, tap } from 'rxjs';

@Component({
  selector: 'ds-books',
  standalone: true,
  imports: [CommonModule, BooksItemComponent, MatButtonModule, MatIconModule, PaginationComponent, MatProgressSpinnerModule, MatSnackBarModule, MatDialogModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {

  pagination$ = new BehaviorSubject<Pagination>({ take: 5, page: 0 });
  books$: Observable<PaginableResponse<BookDTO[]>>;
  private bookService = inject(BookService);
  private _snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.books$ = this.pagination$.asObservable().pipe(
      filter((res) => !!res),
      switchMap((res) => this.bookService.get(res)),
      map((res) => res?.data || { data: [], pageCount: 0 })
    );
  }

  openBookFormDialog(book: BookDTO): void {
    const dialogRef = this.dialog.open(BookFormDialogComponent, {
      data: book || null,
      width: '400px',
      height: '580px',
      scrollStrategy: new NoopScrollStrategy(),
    });

    dialogRef.afterClosed().pipe(
      switchMap((res: BookEditData) => res?.id ? this.editBook(res) : this.addBook(res?.book))
    ).subscribe();
  }

  deleteBook(book: BookDTO): void {
    this.bookService.delete(book?.id).pipe(
      take(1),
      tap(() => {
        this._snackBar.open(`Poprawnie usunięto książkę ${book?.title}`, null, {
          panelClass: 'mat-success',
          duration: 4000,
        });
        this.pagination$.next(this.pagination$.getValue());
      })
    ).subscribe();
  }

  nextPage(): void {
    this.pagination$.next({
      page: this.pagination$.getValue().page + 1,
      take: this.pagination$.getValue().take,
    });
  }

  previousPage(): void {
    this.pagination$.next({
      page: this.pagination$.getValue().page - 1,
      take: this.pagination$.getValue().take,
    });
  }

  private addBook(book: EditableBook): Observable<ServiceResponse<BookDTO>> {
    return this.bookService.add(book).pipe(
      take(1),
      tap(() => {
        this._snackBar.open(`Poprawnie dodano książkę ${book?.title}`, null, {
          panelClass: 'mat-success',
          duration: 4000,
        });
        this.pagination$.next(this.pagination$.getValue());
      })
    );
  }

  private editBook(data: BookEditData): Observable<ServiceResponse<BookDTO>> {
    return this.bookService.put(data?.book, data?.id).pipe(
      take(1),
      tap(() => {
        this._snackBar.open(`Poprawnie edytowano książkę ${data?.book?.title}`, null, {
          panelClass: 'mat-success',
          duration: 4000,
        });
        this.pagination$.next(this.pagination$.getValue());
      })
    );
  }
}
