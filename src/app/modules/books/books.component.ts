import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewModel } from '@core/view-models/main.view-model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ds-books',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {

  protected mainViewModel = inject(MainViewModel);

  ngOnInit(): void {
    this.mainViewModel.pagination = { take: 5, page: 0 };
  }
}
