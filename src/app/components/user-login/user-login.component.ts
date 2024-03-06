import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  signupUsers: any [] = [];

  signupObj: any = {
    username: '',
    email: '',
    password: ''
  };

  loginObj: any = {
    username: '',
    password: ''
  };

  constructor(private router: Router, private authService: AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUsers');
    if(localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
  }

  onSignUp() {
    if (this.signupObj.username === "" || this.signupObj.email === "" || this.signupObj.password === "") {
      alert('É obrigatório preencher todos os campos')
      this.signupObj = {
        username: '',
        email: '',
        password: ''
      };
    } else {
      const isUserExist = this.signupUsers.find(u => u.username === this.signupObj.username || u.email === this.signupObj.email);
      if (isUserExist) {
        this.openSnackBar('Usuário/E-mail já cadastrado', 'Fechar');
        this.signupObj = {
          username: '',
          email: '',
          password: ''
        };
      } else {
        this.openSnackBar('Usuário cadastrado com sucesso', 'Fechar');
        this.signupUsers.push(this.signupObj);
        localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
        this.signupObj = {
          username: '',
          email: '',
          password: ''
        };
      }
    }
  };

  onLogin() {
    const isUserExist = this.signupUsers.find(u => u.username == this.loginObj.username && u.password == this.loginObj.password);
    if(isUserExist != undefined) {
      this.authService.login();
      this.router.navigate(['/album-list']);
    } else {
      alert('Login ou senha incorreta')
    }
  };

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  };
}
