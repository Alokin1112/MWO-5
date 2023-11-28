import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContentComponent } from '@modules/content/content.component';

@Component({
  selector: 'ds-home',
  standalone: true,
  imports: [
    CommonModule, ContentComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent { }
