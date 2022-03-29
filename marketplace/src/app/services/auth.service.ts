import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs';
import { User } from './user.model';

// TODO: ADD NG ROUTING AFTER SIGNOUT ;)

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;


  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
  ) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap(user => {
        // if user is defined
        if (user) { 
          return this.fireStore.doc<User>(`users/${user.id}`).valueChanges();
        } else {
          return of(null); // user not logged in
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.fireAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.fireAuth.doc(`users/${user.id}`);
    
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
