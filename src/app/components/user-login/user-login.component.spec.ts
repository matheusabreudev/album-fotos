import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginComponent } from './user-login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[ RouterTestingModule, MatSnackBarModule, FormsModule ],
      declarations: [ UserLoginComponent ],
      providers: [ AuthService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize signupUsers from localStorage', () => {
    const localData = JSON.stringify([
      { username: 'user1', email: 'user1@example.com', password: 'password1' },
      { username: 'user2', email: 'user2@example.com', password: 'password2' }
    ]);
    spyOn(localStorage, 'getItem').and.returnValue(localData);

    component.ngOnInit();

    expect(component.signupUsers).toEqual(JSON.parse(localData));
  });

  it('should sign up a new user', () => {
    component.signupObj = { username: 'newuser', email: 'newuser@example.com', password: 'newpassword' };
    spyOn(window, 'alert');
    spyOn(component, 'openSnackBar');
    const localStorageSpy = spyOn(localStorage, 'setItem');

    component.onSignUp();

    expect(component.signupUsers.length).toBe(1);
    expect(localStorageSpy).toHaveBeenCalledWith('signUpUsers', JSON.stringify(component.signupUsers));
    expect(component.signupObj).toEqual({ username: '', email: '', password: '' });
  });

  it('should log in an existing user', () => {
    component.signupUsers = [
      { username: 'user1', email: 'user1@example.com', password: 'password1' },
      { username: 'user2', email: 'user2@example.com', password: 'password2' }
    ];
    component.loginObj = { username: 'user1', password: 'password1' };
    spyOn(authService, 'login');
    spyOn(router, 'navigate');

    component.onLogin();

    expect(authService.login).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/album-list']);
  });

  it('should not log in if user credentials are incorrect', () => {
    component.signupUsers = [
      { username: 'user1', email: 'user1@example.com', password: 'password1' },
      { username: 'user2', email: 'user2@example.com', password: 'password2' }
    ];
    component.loginObj = { username: 'user3', password: 'password3' };
    spyOn(window, 'alert');

    component.onLogin();

    expect(window.alert).toHaveBeenCalledWith('Login ou senha incorreta');
  });

  it('should open a snack bar', () => {
    spyOn(component['_snackBar'], 'open');
    const message = 'Test message';
    const action = 'Test action';

    component.openSnackBar(message, action);

    expect(component['_snackBar'].open).toHaveBeenCalledWith(message, action, { duration: 2000 });
  });
});
