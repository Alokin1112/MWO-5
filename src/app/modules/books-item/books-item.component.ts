import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PricePipe } from '@shared/pipes/price/price.pipe';
import { BookDTO } from '@core/interfaces/book.interface';

@Component({
  selector: 'ds-books-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, PricePipe],
  templateUrl: './books-item.component.html',
  styleUrls: ['./books-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksItemComponent {
  @Input() book: BookDTO;
  @Output() deleteBook = new EventEmitter<BookDTO>();
  @Output() editBook = new EventEmitter<BookDTO>();
}
