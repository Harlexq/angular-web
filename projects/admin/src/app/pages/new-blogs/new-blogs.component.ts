import { Component } from '@angular/core';
import {
  BlogsService,
  InputControlComponent,
} from '../../../../../library/src/public-api';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MainBtnComponent } from '../../components/main-btn/main-btn.component';
import {
  NgxSimpleTextEditorModule,
  EditorConfig,
} from 'ngx-simple-text-editor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-blogs',
  standalone: true,
  imports: [
    InputControlComponent,
    ReactiveFormsModule,
    MainBtnComponent,
    NgxSimpleTextEditorModule,
    FormsModule,
  ],
  templateUrl: './new-blogs.component.html',
  styleUrl: './new-blogs.component.scss',
})
export class NewBlogsComponent {
  form!: FormGroup;

  config: EditorConfig = {
    placeholder: 'Blog Açıklamasını Giriniz',
  };

  constructor(
    private formBuilder: FormBuilder,
    private blogsService: BlogsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(500)]],
      imageUrl: ['', [Validators.required]],
      author: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
  }

  create() {
    this.blogsService.postBlogs(this.form.value, (res) => {
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
