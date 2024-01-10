import { Injectable } from '@angular/core';
import { BaseService } from '../services';
import { Blogs } from '../../models/blogs';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private http: BaseService) {}

  getBlogs(callBack: (res: Blogs[]) => void) {
    this.http.get('blogs', (res) => callBack(res as Blogs[]));
  }

  postBlogs(model: Blogs, callBack: (res: Blogs) => void) {
    this.http.post('blogs', model, (res) => callBack(res as Blogs));
  }

  getBlogDetail(blogId: any, callBack: (res: Blogs) => void) {
    this.http.get(`blogs/${blogId}`, (res) => callBack(res as Blogs));
  }
}
