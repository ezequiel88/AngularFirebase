import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../models/Produto.models';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  public lista: Observable<any>;
  public user_id: string = '';

  constructor(private afd: AngularFirestore, private afa: AngularFireAuth) {
    this.lista = this.afd.collection<Product>('Produtos').valueChanges()
    this.afa.authState.subscribe((user) => {
      if (user?.uid) {
        this.user_id = user?.uid;
        console.log(user)
        this.listById(this.user_id)
      } else {
        this.user_id = ''
      }
    })

  }

  save(produto: Product) {
    if (!produto.id || produto.id === '') {
      produto.user_create = this.user_id
      produto.user_edit = ''
      produto.id = this.afd.createId()
    } else {
      produto.user_edit = this.user_id
    }
    return this.afd.collection<Product>('Produtos').doc(produto.id).set(produto, { merge: true })
  }


  listById(uid: string) {
  //  this.lista = this.afd.collection('Produtos', ref => {
  //    return ref.where('user_create', '==', uid)
  //  }).valueChanges()
  }

  delete(id: string) {
    return this.afd.collection('Produtos').doc(id).delete()
  }
}
