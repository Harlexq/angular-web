import { Component } from '@angular/core';
import {
  InputControlComponent,
  UserService,
} from '../../../../../library/src/public-api';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MainBtnComponent } from '../../components/main-btn/main-btn.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [InputControlComponent, NgIf, MainBtnComponent, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(12),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(15),
          ],
        ],
        age: ['', [Validators.required]],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.minLength(5),
            Validators.maxLength(50),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
          ],
        ],
        rePassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(16),
          ],
        ],
      },
      {
        validator: this.matchingPasswords('password', 'repassword'),
      }
    );
  }

  matchingPasswords(Password: string, ConfirmPassword: string) {
    return (controls: AbstractControl) => {
      if (controls) {
        const Password = controls.get('password')!.value;
        const ConfirmPassword = controls.get('rePassword')!.value;

        if (Password !== ConfirmPassword) {
          controls.get('rePassword')?.setErrors({ not_the_same: true });

          return { mismatchedPassword: true };
        }
      }
      return null;
    };
  }

  tokenGenerator(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  }

  signup() {
    const id = Math.random().toString(36).substr(2, 9);
    const token = this.tokenGenerator(32);
    localStorage.setItem('token', token);

    const formData = {
      id: id,
      ...this.form.value,
      token: token,
    };

    this.userService.postUser(formData, (res) => {
      this.form.setValue(res);
    });
  }

  public get newFirstName(): FormControl {
    return this.form.get('firstName') as FormControl;
  }

  public get newLastName(): FormControl {
    return this.form.get('lastName') as FormControl;
  }

  public get newAge(): FormControl {
    return this.form.get('age') as FormControl;
  }

  public get newEmail(): FormControl {
    return this.form.get('email') as FormControl;
  }

  public get newPassword(): FormControl {
    return this.form.get('password') as FormControl;
  }

  public get newRePassword(): FormControl {
    return this.form.get('rePassword') as FormControl;
  }
}
