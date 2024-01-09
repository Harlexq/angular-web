import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'lib-input-control',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './input-control.component.html',
  styleUrl: './input-control.component.scss',
})
export class InputControlComponent {
  @Input({ required: true }) labelName: string = '';
  @Input({ required: true }) form!: FormGroup;
  @Input() placeholder: string = '';
  @Input() type?: 'text' | 'password' | 'email' | 'number' = 'text';
  @Input({ required: true }) formControl: FormControl = new FormControl();
}
