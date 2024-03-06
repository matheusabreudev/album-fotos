import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { AlbumComponent } from './components/album/album.component';
import { FotoListComponent } from './components/foto/foto-list.component';
import { AuthGuard } from './security/auth-guard';

const routes: Routes = [
  { path: '',
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  {
    path: "login",
    component: UserLoginComponent,
  },
  {
    path: "album-list",
    component: AlbumComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "foto-list/:albumId",
    component: FotoListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
