import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  mostrarToolbar: boolean = false;
  isLoggedIn: boolean;
  mostrarBotaoVoltar: boolean = false;


  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.mostrarToolbar = !this.router.url.includes('/login');
        this.mostrarBotaoVoltar = this.router.url.includes('/foto-list');
      }
    });
   }

  ngOnInit(): void { }

  goBack() {
    this.router.navigate(['/album-list']);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
