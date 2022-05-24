import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user$: Observable<User | null | undefined>;

  constructor(
    private fireStore: AngularFirestore,
    private fireAuth: AngularFireAuth,
    ) {
    this.user$ = this.fireAuth.authState.pipe(
      // @ts-ignore
      switchMap(user => {
      // if user is defined
      if (user) {
        return this.fireStore.doc<User>(`user/${user.uid}`).valueChanges();
      } else {
        return of(null); // user not logged in
      }
    })
  );
  }

  async createPost(body: string, title: string, tribe: string, document: string, image: string) {
    var user = firebase.auth().currentUser;
    this.fireStore.collection('post').add({
      body: body,
      title: title,
      tribe: tribe,
      document: document,
      user: user?.uid,
      image: image
    })
    .catch(e => {
      console.log(e);
    })

  }
}
