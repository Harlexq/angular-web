import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-pagination',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  pageNumber: number = 0;

  items = [
    {
      id: 1,
    },
  ];
}
