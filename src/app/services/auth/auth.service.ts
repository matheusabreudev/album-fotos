import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() { }

  login() {
    this.isAuthenticatedSubject.next(true);
  }

  logout() {
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
