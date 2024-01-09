import { Component } from '@angular/core';
import { CardsComponent } from './cards/cards.component';
import { PaginationComponent } from '../../../../../library/src/public-api';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CardsComponent, PaginationComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent {}
