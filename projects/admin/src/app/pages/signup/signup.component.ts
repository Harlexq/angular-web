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
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    InputControlComponent,
    NgIf,
    MainBtnComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
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
        validator: this.matchingPasswords(),
      }
    );
  }

  passwordErr: string = '';

  matchingPasswords(): any {
    return (group: FormGroup) => {
      const password = group.controls['password'].value;
      const confirmPassword = group.controls['rePassword'].value;

      if (password !== confirmPassword) {
        group.controls['rePassword'].setErrors({ not_the_same: true });
        this.passwordErr = 'Şifreler birbirine uyuşmuyor';
      } else {
        group.controls['rePassword'].setErrors(null);
        this.passwordErr = '';
      }
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

    const formData = {
      id: id,
      token: token,
      ...this.form.value,
    };

    this.userService.postUser(formData, (res) => {
      this.router.navigateByUrl('/login');
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
