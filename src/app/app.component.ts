import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'album-fotografias';

  mostrarToolbar: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.mostrarToolbar = !this.router.url.includes('/login');
      }
    });
  }
}
