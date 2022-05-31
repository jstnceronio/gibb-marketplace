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
  authState: any = null;
  user$: Observable<User | null | undefined>;
  
  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
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

  async googleSignin() { 
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.fireAuth.signInWithPopup(provider);
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/register']);
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
      school: "",
      img: null
    };
    return userRef.set(data, { merge: true });
  }

  async deleteCurrentUser() {
    this.user$.subscribe((user: any) => {
      if (user) {
        var userRef: AngularFirestoreDocument<User> = this.fireStore.doc(`user/${user.uid}`);
        userRef.delete();
        return console.log("Deleted user sucessfully")
      } else {
        return console.log('Error while deleting user');
      }
    });
    var user = firebase.auth().currentUser;
    await user!.delete();
    return this.router.navigate([''])
  }

  editUserData(firstname: string, name: string, username: string, school: string, img?: string) {
    this.user$.subscribe((user: any) => {
      if (user) {
        const userRef: AngularFirestoreDocument<User> = this.fireStore.doc(`user/${user.uid}`);
        const data: User = {
          uid: user.uid,
          firstname: firstname,
          name: name,
          username: username,
          email: user.email,
          school: school,
          img: img || 'undefined',
        };
        userRef.update(data);

      } else {
        console.log('User not signed in');
        return null;
      }
    });
  }

  async signOut() {
    await this.fireAuth.signOut();
    return this.router.navigate(['/login']);
  }
}
