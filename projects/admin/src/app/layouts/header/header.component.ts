import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgStyle],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  divStyle = {};
  isStyled = false;

  constructor(private router: Router) {}

  userContent() {
    this.isStyled = !this.isStyled;

    if (this.isStyled) {
      this.divStyle = {
        display: 'block',
      };
    } else {
      this.divStyle = {
        display: 'none',
      };
    }
  }

  logout() {
    this.router.navigateByUrl('/login');
    localStorage.removeItem('token');
  }
}
