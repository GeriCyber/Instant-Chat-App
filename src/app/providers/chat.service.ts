import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public chats: Mensaje[] = [];
  public usuario: any = {};
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      // console.log('Estado del usuario: ', user);
      if (!user) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
  }

  login(proveedor: string) {
    if (proveedor === 'google') {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }
  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(8));
    return this.itemsCollection.valueChanges()
    .pipe(map((mensajes: Mensaje[]) => {
      // console.log(mensajes);
      this.chats = [];
      for (const mensaje of mensajes) {
        this.chats.unshift(mensaje);
      }
      return this.chats;
    }) );
  }

  agregarMensaje(texto: string) {
    const mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };
    return this.itemsCollection.add(mensaje);
  }
}
