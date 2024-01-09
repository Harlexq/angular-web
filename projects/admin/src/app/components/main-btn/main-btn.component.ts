import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-btn',
  standalone: true,
  imports: [],
  templateUrl: './main-btn.component.html',
  styleUrl: './main-btn.component.scss',
})
export class MainBtnComponent {
  @Input() type?: 'submit' | 'button' = 'button';
  @Input() disabled: boolean = false;
}
