import { Component } from '@angular/core';
import { AuthService, LogoutOptions } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  constructor(public auth: AuthService,private router: Router) {}

  loginWithRedirect(): void {
    this.auth.loginWithRedirect({ appState: { target: '/admin' } });
  }


  logout(): void {
    this.auth.logout({ returnTo: window.location.origin } as LogoutOptions);
  }
  
}