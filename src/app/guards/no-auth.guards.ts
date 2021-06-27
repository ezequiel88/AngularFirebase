import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class NoAuthGuard implements CanActivate {

  constructor(private afa: AngularFireAuth, private router: Router) { }

  canActivate() {
      return this.afa.authState.pipe(
          take(1),
          switchMap(async (authState) => {
              if (authState) { //<-- verifica se está logado
                  const token = await authState.getIdTokenResult()
                  if (!token.claims.admin) { //<-- verifica as permissões
                    console.log('Usuário Comum')
                      this.router.navigate(['/'])
                      return false
                  } else {
                    console.log('Administrador')
                    //this.router.navigate(['/admin'])
                      return false
                  }
              } else {
                console.log('Não Logado')
                return true                
              }
          }),
      )
  }
}