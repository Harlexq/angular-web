import { Component } from '@angular/core';
import { TableComponent } from './table/table.component';
import { MainBtnComponent } from '../../components/main-btn/main-btn.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [TableComponent, MainBtnComponent, RouterLink],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent {}
