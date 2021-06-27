import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/Produto.models';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  public lista: any
  public user_id: any;

  constructor(private afd: AngularFirestore, private afa: AngularFireAuth) {
    this.afa.authState.subscribe((user) => {
      if (user?.uid) {
        this.user_id = user?.uid;
        console.log(user)
        this.list(this.user_id)
      } else {
        this.user_id = ''
      }
    })

  }

  save(produto: Product) {
    produto.id == '' ? produto.user_create = this.user_id : produto.user_edit = this.user_id
    produto.id == '' ? produto.id = this.afd.createId() : produto.id = produto.id
    return this.afd.collection('Produtos').doc(produto.id).set(produto, { merge: true })
  }

  list(uid: string) {
    // this.lista = this.afd.collection('Produtos', ref => {
    //   return ref.where('user_create', '==', uid)
    // }).valueChanges()

    this.lista = this.afd.collection('Produtos').valueChanges()
  }

  listById() {

  }

  delete(id: string) {
    return this.afd.collection('Produtos').doc(id).delete()
  }
}
