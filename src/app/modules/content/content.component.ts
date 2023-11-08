import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { City } from '@core/interfaces/city.interface';
import { WeatherModel } from '@core/models/weather.model';
import { WeatherService } from '@core/services/weather.service';
import { BooksComponent } from '@modules/books/books.component';
import { CitySearchComponent } from '@modules/city-search/city-search.component';
import { TemperaturesComponent } from '@modules/temperatures/temperatures.component';
import { Observable, combineLatest, map } from 'rxjs';

@Component({
  selector: 'ds-content',
  standalone: true,
  imports: [CommonModule, CitySearchComponent, MatProgressSpinnerModule, TemperaturesComponent, BooksComponent, MatProgressSpinnerModule],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {
  weather$: Observable<WeatherModel>;
  city: City;
  private weatherService = inject(WeatherService);

  handleCityChange(city: City) {
    this.city = city;
    this.weather$ = combineLatest([
      this.weatherService.getCurrentWeather(city?.Key),
      this.weatherService.getYesterdaysWeather(city?.Key),
      this.weatherService.getForecast_1Day(city?.Key),
      this.weatherService.getForecast_5Day(city?.Key),
      this.weatherService.getForecast_1Hour(city?.Key),
      this.weatherService.getForecast_12Hour(city?.Key)
    ]).pipe(
      map(([current, yesterday, oneDay, fiveDays, oneHour, twelveHours]) => new WeatherModel(current, yesterday, oneDay, fiveDays, oneHour, twelveHours))
    );
  }

}
