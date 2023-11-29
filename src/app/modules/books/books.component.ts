import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookDTO } from '@core/interfaces/book.interface';
import { PaginableResponse, Pagination } from '@core/interfaces/pagination.interface';
import { BookService } from '@core/services/book.service';
import { BooksItemComponent } from '@modules/books-item/books-item.component';
import { PaginationComponent } from '@modules/pagination/pagination.component';
import { BehaviorSubject, Observable, catchError, filter, map, of, switchMap, take, tap } from 'rxjs';

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
  private router = inject(Router);

  ngOnInit(): void {
    this.books$ = this.pagination$.asObservable().pipe(
      filter((res) => !!res),
      switchMap((res) => this.bookService.get(res)),
      map((res) => res?.data || { data: [], pageCount: 0 }),
      catchError(() => of({ data: [], pageCount: -1 }))
    );
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

  addBook(): void {
    void this.router.navigateByUrl('/addBook');
  }

  editBook(data: BookDTO): void {
    void this.router.navigateByUrl(`/editBook/${data?.id}`);
  }
}
