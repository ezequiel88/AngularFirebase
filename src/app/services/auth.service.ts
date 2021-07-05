import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { Login } from '../models/Login.models';
import { Usuario } from '../models/Usuario.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public admin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public user: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(private afa: AngularFireAuth, private afd: AngularFirestore) {
    this.afa.onAuthStateChanged((user: firebase.default.User | null) => {
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

  async register(usuario: Usuario) {
    return new Promise<void>((resolve, reject) => {
      try {
        this.afa.createUserWithEmailAndPassword(usuario.email, usuario.senha)
          .then((res) => {
            if (res.user) {
              this.afd.collection<any>('Usuarios').doc(res.user.uid).set({
                "nome": usuario.nome,
                "email": usuario.email,
                "whats": usuario.whats,
                "uid": res.user.uid,
                "nivel": 0 //<- 0: user, 1: admin, 2: master
              }).then((res) => resolve(res)).catch((err) => reject(err))
            }
          }).catch((err) => {
            reject(err)
          })
      } catch (err) {
        reject(err)
      }
    })
  }

  forgotPassword(email: string): Observable<any> {
    return from(this.afa.sendPasswordResetEmail(email))
  }

  logout(): Observable<void> {
    return from(this.afa.signOut())
  }
}