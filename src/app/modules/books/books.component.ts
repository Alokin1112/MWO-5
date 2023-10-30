import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewModel } from '@core/view-models/main.view-model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PricePipe } from '@shared/pipes/price/price.pipe';

@Component({
  selector: 'ds-books',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, PricePipe],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {

  protected mainViewModel = inject(MainViewModel);

  ngOnInit(): void {
    this.mainViewModel.pagination = { take: 5, page: 0 };
  }
}
