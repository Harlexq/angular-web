import { Component } from '@angular/core';
import { BlogsService } from '../../../../../../library/src/public-api';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  blogs: any[] = [];

  constructor(private blogsService: BlogsService) {}

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs() {
    this.blogsService.getBlogs((res) => (this.blogs = res));
  }
}
