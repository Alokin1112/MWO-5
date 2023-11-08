import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { WeatherService } from '@core/services/weather.service';
import { Observable, debounceTime, distinctUntilChanged, of, switchMap, tap } from 'rxjs';
import { City } from '@core/interfaces/city.interface';
import { MainViewModel } from '@core/view-models/main.view-model';

@Component({
  selector: 'ds-city-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatAutocompleteModule, MatInputModule, MatIconModule],
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CitySearchComponent implements OnInit {

  @Output() lzSelect = new EventEmitter<City>();
  weatherService = inject(WeatherService);
  control = new FormControl<string>('');
  cities: City[];

  options$: Observable<City[]>;

  ngOnInit(): void {
    this.options$ = this.control.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((res) => res ? this.weatherService.getLocations(res) : of([] as City[])),
      tap((res) => this.cities = res)
    );
  }

  onSelect(val: MatAutocompleteSelectedEvent): void {
    const value = val?.option?.value as string;
    const city = this.cities.find((item) => item.LocalizedName == value);
    city && this.lzSelect.emit(city);
  }
}
