import { Component, OnChanges } from '@angular/core';
import {
  InputControlComponent,
  UserService,
} from '../../../../../library/src/public-api';
import {
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
  selector: 'app-login',
  standalone: true,
  imports: [
    InputControlComponent,
    NgIf,
    MainBtnComponent,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
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
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  accountErr: string = '';
  tokenErr: string = '';
  passwordErr: string = '';

  login() {
    this.resetErrors();

    if (this.form.value.email) {
      this.userService.getUser(this.form.value.email, (res) => {
        if (res.length === 0) {
          this.accountErr = 'Böyle Bir Hesap Bulunamadı';
        } else {
          if (res[0].password === this.form.value.password) {
            this.userService.user = res[0];

            const userToken = res[0].token;

            if (userToken) {
              localStorage.setItem('token', userToken);
            } else {
              this.tokenErr = 'Token Bulunamadı';
            }

            this.router.navigateByUrl('/dashboard');
          } else {
            this.passwordErr = 'Yanlış Şifre';
          }
        }
      });
    }
  }

  resetErrors() {
    this.accountErr = '';
    this.tokenErr = '';
    this.passwordErr = '';
  }

  public get newEmail(): FormControl {
    return this.form.controls['email'] as FormControl;
  }

  public get newPassword(): FormControl {
    return this.form.controls['password'] as FormControl;
  }
}
