import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MainViewModel } from '@core/view-models/main.view-model';
import { CitySearchComponent } from '@modules/city-search/city-search.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { TemperaturesComponent } from '@modules/temperatures/temperatures.component';
import { BooksComponent } from '@modules/books/books.component';

@Component({
  selector: 'ds-content',
  standalone: true,
  imports: [CommonModule, CitySearchComponent, MatProgressSpinnerModule, TemperaturesComponent, BooksComponent],
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentComponent {

  protected mainViewModel = inject(MainViewModel);

}
