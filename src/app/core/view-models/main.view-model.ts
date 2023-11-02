import { NoopScrollStrategy } from "@angular/cdk/overlay";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Book, BookDTO, EditableBook } from '@core/interfaces/book.interface';
import { City } from "@core/interfaces/city.interface";
import { Pagination } from '@core/interfaces/pagination.interface';
import { BookService } from '@core/services/book.service';
import { WeatherService } from "@core/services/weather.service";
import { BookViewModel } from '@core/view-models/book.view-model';
import { WeatherViewModel } from "@core/view-models/weather.view-model";
import { BookFormDialogComponent } from "@modules/book-form-dialog/book-form-dialog.component";
import { BehaviorSubject, Observable, combineLatest, filter, map, of, switchMap, take, tap } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class MainViewModel {

  private city: City;
  private _pagination$ = new BehaviorSubject<Pagination>(null);
  private _bookViewModel = new BookViewModel();
  private _weatherViewModel$: Observable<WeatherViewModel>;

  constructor(
    private weatherService: WeatherService,
    private bookService: BookService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
    this._bookViewModel.books = this._pagination$.asObservable().pipe(
      filter((res) => !!res),
      switchMap((res) => this.bookService.get(res))
    );
  }

  get weatherViewModel$(): Observable<WeatherViewModel> {
    return this._weatherViewModel$ || of(null);
  }

  get pagination(): Pagination {
    return this._pagination$.getValue();
  }

  set pagination(pagination: Pagination) {
    this._pagination$.next(pagination);
  }

  nextPage(): void {
    this._pagination$.next({
      page: this.pagination.page + 1,
      take: this.pagination.take,
    });
  }

  previousPage(): void {
    this._pagination$.next({
      page: this.pagination.page - 1,
      take: this.pagination.take,
    });
  }

  get bookViewModel(): BookViewModel {
    return this._bookViewModel;
  }

  get selectedCity(): City {
    return this.city;
  }

  set selectedCity(city: City) {
    this.city = city;
    if (city)
      this.updateWeatherData();
  }

  openBookFormDialog(book: BookDTO): void {
    this.dialog.open(BookFormDialogComponent, {
      data: book || null,
      width: '400px',
      height: '580px',
      scrollStrategy: new NoopScrollStrategy(),
    });
  }

  addBook(book: EditableBook): void {
    this.bookService.add(book).pipe(
      take(1),
      tap(() => {
        this._snackBar.open(`Poprawnie dodano książkę ${book?.title}`, null, {
          panelClass: 'mat-success',
          duration: 4000,
        });
        this._pagination$.next(this._pagination$.getValue());
      })
    ).subscribe();
  }

  editBook(book: EditableBook, id: number,): void {
    this.bookService.put(book, id).pipe(
      take(1),
      tap(() => {
        this._snackBar.open(`Poprawnie edytowano książkę ${book?.title}`, null, {
          panelClass: 'mat-success',
          duration: 4000,
        });
        this._pagination$.next(this._pagination$.getValue());
      })
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
        this._pagination$.next(this._pagination$.getValue());
      })
    ).subscribe();
  }

  private updateWeatherData() {
    this._weatherViewModel$ = combineLatest([
      this.weatherService.getCurrentWeather(this.city?.Key),
      this.weatherService.getYesterdaysWeather(this.city?.Key),
      this.weatherService.getForecast_1Day(this.city?.Key),
      this.weatherService.getForecast_5Day(this.city?.Key),
      this.weatherService.getForecast_1Hour(this.city?.Key),
      this.weatherService.getForecast_12Hour(this?.city?.Key)
    ]).pipe(
      map(([current, yesterday, oneDay, fiveDays, oneHour, twelveHours]) => new WeatherViewModel(current, yesterday, oneDay, fiveDays, oneHour, twelveHours))
    );
  }
}