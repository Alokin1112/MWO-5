import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WeatherModel } from '@core/models/weather.model';

@Component({
  selector: 'ds-temperatures',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './temperatures.component.html',
  styleUrls: ['./temperatures.component.scss'],
})
export class TemperaturesComponent {

  @Input() weatherModel: WeatherModel;
}
