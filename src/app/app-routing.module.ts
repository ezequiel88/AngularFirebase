import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { NoAuthGuard } from './guards/no-auth.guards';
import { RedefinirSenhaComponent } from './components/redefinir-senha/redefinir-senha.component';
import { RegisterComponent } from './components/register/register.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path : '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    canActivate: [ AngularFireAuthGuard ],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ NoAuthGuard]
  },
  {
    path: 'redefinir-senha',
    component: RedefinirSenhaComponent,
    canActivate: [ NoAuthGuard]
  }
  ,
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ NoAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
