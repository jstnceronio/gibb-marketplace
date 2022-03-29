import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null | undefined>;


  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private  router: Router
  ) {
    this.user$ = this.fireAuth.authState.pipe(
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

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.fireAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user: firebase.User | null) {
    if (!user) {
      return;
    }
    const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(`user/${user.uid}`);
    const data: User = {
      uid: user.uid,
      firstname: "",
      name: "",
      username: user?.displayName ? user.displayName : "",
      email: user?.email ? user.email : "",
      school: ""
    };
    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.fireAuth.signOut();
    return this.router.navigate(['/']);
  }
}