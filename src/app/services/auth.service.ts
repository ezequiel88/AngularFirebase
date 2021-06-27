import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Login } from '../models/Login.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public admin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public user: BehaviorSubject<any> = new BehaviorSubject(null)

   constructor(private afa: AngularFireAuth) {    
    this.afa.onAuthStateChanged((user: firebase.default.User|null) => {     
      if (user) {             
        user.getIdTokenResult()
          .then((idTokenResult) => {
            console.log(idTokenResult)
            if (!!idTokenResult.claims.admin) {              
              this.admin.next(true)// <-- Administrador do Sistema
            } else {              
              this.admin.next(false)//<-- Usuário Normal
            }
          })
          .catch((error) => {
            this.admin.next(false)
          })
      } else {
        this.admin.next(false)
      }
       this.user.next(user)
    })

  }

  login(login: Login): Observable<firebase.default.auth.UserCredential> {
    return from(this.afa.signInWithEmailAndPassword(login.email, login.senha))
  }

  forgotPassword(email: string): Observable<any> {
    return from(this.afa.sendPasswordResetEmail(email))
  }

  logout(): Observable<void> {
    return from(this.afa.signOut())
  }
}