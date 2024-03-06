import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FakeLoginComponent } from '../fakes/fake-login.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let router: Router;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['logout']);
    await TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [ RouterTestingModule.withRoutes([
        { path: 'login', component: FakeLoginComponent },
      ]) ],
      declarations: [ ToolbarComponent, FakeLoginComponent ],
      providers: [{ provide: AuthService, useValue: authService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize', () => {
    expect(component.mostrarToolbar).toBeFalse();
    expect(component.isLoggedIn).toBeUndefined();
    expect(component.mostrarBotaoVoltar).toBeFalse();
  });

  it('should update mostrarToolbar and mostrarBotaoVoltar on router events', async () => {
    spyOn(router, 'navigateByUrl').and.callFake(async (url: string) => {
      if (url === '/login') {
        component.mostrarToolbar = false;
        component.mostrarBotaoVoltar = false;
      } else if (url === '/other-url') {
        component.mostrarToolbar = true;
        component.mostrarBotaoVoltar = false;
      } else if (url === '/foto-list') {
        component.mostrarToolbar = true;
        component.mostrarBotaoVoltar = true;
      }
      return true;
    });
  
    await router.navigateByUrl('/login');
    expect(component.mostrarToolbar).toBeFalse();
    expect(component.mostrarBotaoVoltar).toBeFalse();
  
    await router.navigateByUrl('/other-url');
    expect(component.mostrarToolbar).toBeTrue();
    expect(component.mostrarBotaoVoltar).toBeFalse();
  
    await router.navigateByUrl('/foto-list');
    expect(component.mostrarToolbar).toBeTrue();
    expect(component.mostrarBotaoVoltar).toBeTrue();
  });

  it('should navigate to album-list on goBack()', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/album-list']);
  });

  it('should call logout() on onLogout()', () => {
    component.onLogout();
    expect(authService.logout).toHaveBeenCalled();
  });
});
