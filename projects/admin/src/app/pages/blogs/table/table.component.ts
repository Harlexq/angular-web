import { Component } from '@angular/core';
import { BlogsService } from '../../../../../../library/src/public-api';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, RouterLink],
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
      if (res.success) {
        this.getBlogs();
      }
    });
  }
}
