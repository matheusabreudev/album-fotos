import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set isAuthenticatedSubject to true on login', () => {
    service.login();
    service.isAuthenticated$.subscribe(isAuthenticated => {
      expect(isAuthenticated).toBeTruthy();
    });
  });

  it('should set isAuthenticatedSubject to false on logout', () => {
    service.logout();
    service.isAuthenticated$.subscribe(isAuthenticated => {
      expect(isAuthenticated).toBeFalsy();
    });
  });

  it('should return true if user is logged in', () => {
    service.login();
    const isLoggedIn = service.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
  });

  it('should return false if user is logged out', () => {
    service.logout();
    const isLoggedIn = service.isLoggedIn();
    expect(isLoggedIn).toBeFalsy();
  });
});
