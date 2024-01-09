import { Component } from '@angular/core';
import { BlogsService } from '../../../../../../library/src/public-api';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  blogs: any[] = [];

  constructor(private blogsService: BlogsService) {}

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs() {
    this.blogsService.getBlogs((res) => (this.blogs = res));
  }
}
