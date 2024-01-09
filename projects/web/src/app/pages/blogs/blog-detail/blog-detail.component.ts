import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../../../../../../library/src/public-api';
import { NgIf } from '@angular/common';
import { Blogs } from '../../../../../../library/src/lib/class/blogs';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss',
})
export class BlogDetailComponent {
  blogId: any;
  blogs: any;

  constructor(
    private route: ActivatedRoute,
    private blogsService: BlogsService
  ) {}

  ngOnInit() {
    this.blogId = this.route.snapshot.paramMap.get('blogId');
    this.blogsService.getBlogDetail(this.blogId, (res) => {
      this.blogs = res;
    });
  }
}
