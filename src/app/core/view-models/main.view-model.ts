import { BookService } from './../services/book.service';
import { Injectable } from "@angular/core";
import { City } from "@core/interfaces/city.interface";
import { Pagination } from '@core/interfaces/pagination.interface';
import { WeatherService } from "@core/services/weather.service";
import { BookViewModel } from '@core/view-models/book.view-model';
import { WeatherViewModel } from "@core/view-models/weather.view-model";
import { Observable, combineLatest, map, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MainViewModel {

  private city: City;
  private _pagination: Pagination;
  private _bookViewModel = new BookViewModel();
  private _weatherViewModel$: Observable<WeatherViewModel>;

  constructor(
    private weatherService: WeatherService,
    private bookService: BookService,
  ) { }

  get weatherViewModel$(): Observable<WeatherViewModel> {
    return this._weatherViewModel$ || of(null);
  }

  get pagination(): Pagination {
    return this._pagination;
  }

  set pagination(pagination: Pagination) {
    this._bookViewModel.books = this.bookService.get(pagination);
    this._pagination = pagination;
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