import { Component } from '@angular/core';
import {
  BlogsService,
  PaginationComponent,
} from '../../../../../../library/src/public-api';
import { NgFor, SlicePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, RouterLink, PaginationComponent, SlicePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  blogs: any[] = [];

  constructor(private blogsService: BlogsService, private router: Router) {}

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs() {
    this.blogsService.getBlogs((res) => (this.blogs = res));
  }

  deleteBlog(blogId: any) {
    this.blogsService.deleteBlog(blogId, (res) => {
      window.location.reload();
    });
  }
}
