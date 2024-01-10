import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  BlogsService,
  InputControlComponent,
} from '../../../../../library/src/public-api';
import { ActivatedRoute, Router } from '@angular/router';
import { MainBtnComponent } from '../../components/main-btn/main-btn.component';
import {
  NgxSimpleTextEditorModule,
  EditorConfig,
} from 'ngx-simple-text-editor';

@Component({
  selector: 'app-update-blog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputControlComponent,
    MainBtnComponent,
    NgxSimpleTextEditorModule,
  ],
  templateUrl: './update-blog.component.html',
  styleUrl: './update-blog.component.scss',
})
export class UpdateBlogComponent {
  form!: FormGroup;
  blogId: any;
  blogs: any;

  config: EditorConfig = {
    placeholder: 'Blog Açıklamasını Giriniz',
  };

  constructor(
    private formBuilder: FormBuilder,
    private blogsService: BlogsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateForm();

    this.blogId = this.activatedRoute.snapshot.paramMap.get('id');
    this.blogsService.getBlogDetail(this.blogId, (res) => {
      this.blogs = res;
      this.form.patchValue({
        title: this.blogs.title,
        description: this.blogs.description,
        imageUrl: this.blogs.imageUrl,
        author: this.blogs.author,
        date: this.blogs.date,
      });
    });
  }

  updateForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(500)]],
      imageUrl: ['', [Validators.required]],
      author: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
  }

  update() {
    const request = {
      title: this.form.get('title')?.value,
      description: this.form.get('description')?.value,
      imageUrl: this.form.get('imageUrl')?.value,
      author: this.form.get('author')?.value,
      date: this.form.get('date')?.value,
    };
    this.blogsService.updateBlog(this.blogs.id, request, (res) => {
      this.router.navigateByUrl('/blogs');
    });
  }

  public get newTitle(): FormControl {
    return this.form.get('title') as FormControl;
  }

  public get newDescription(): FormControl {
    return this.form.get('description') as FormControl;
  }

  public get newImageUrl(): FormControl {
    return this.form.get('imageUrl') as FormControl;
  }

  public get newAuthor(): FormControl {
    return this.form.get('author') as FormControl;
  }

  public get newDate(): FormControl {
    return this.form.get('date') as FormControl;
  }
}
