import { Injectable } from '@angular/core';
<<<<<<< HEAD
import firebase from 'firebase/compat/app';
=======

import { auth } from 'firebase/app';

>>>>>>> d2e01cf62a27903c845c92b7bfb5d2f39d317a11
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs';
import { User } from './user.model';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: ADD NG ROUTING AFTER SIGNOUT ;)

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null | undefined>;


  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
  ) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap(user => {
        // if user is defined
        if (user) { 
          return this.fireStore.doc<User>(`users/${user.uid}`).valueChanges();
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

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(`users/${user.uid}`);
    
    const data = {
      uid: user.uid,
      firstname: user.firstname,
      name: user.name,
      username: user.username,
      email: user.email,
      school: user.school
    };

    return userRef.set(data, { merge: true });
  }
}
