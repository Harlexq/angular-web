import { NgStyle } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../../library/src/public-api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgStyle],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  divStyle = { display: 'none' };
  firstName: string = '';
  lastName: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.updateUserName();
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.divStyle = { display: 'none' };
    }
  }

  toggleUserContent(): void {
    this.divStyle = {
      display: this.divStyle.display === 'none' ? 'block' : 'none',
    };
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  logout() {
    this.router.navigateByUrl('/login');
    localStorage.removeItem('token');
  }

  updateUserName() {
    const token = localStorage.getItem('token');
    if (token) {
      this.userService.getUserInfo(token, (user) => {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
      });
    }
  }
}
