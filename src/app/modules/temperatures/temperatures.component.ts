import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MainViewModel } from '@core/view-models/main.view-model';

@Component({
  selector: 'ds-temperatures',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './temperatures.component.html',
  styleUrls: ['./temperatures.component.scss'],
})
export class TemperaturesComponent {

  protected mainViewModel = inject(MainViewModel);
}
