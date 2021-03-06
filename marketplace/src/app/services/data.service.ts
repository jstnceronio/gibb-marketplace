import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { map, Observable, of } from 'rxjs';
import { switchMap, flatMap, Subscription } from 'rxjs';
import { User } from './user.model';
import { Post } from '../shared/post/post.model';
import { Comment } from '../pages/post/comment/comment.model'
@Injectable({
  providedIn: 'root'
})
export class DataService {
  user$: Observable<User | null | undefined>;
  posts: Observable<Post[]>;

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
    this.posts = this.setPosts();
  }

  // TODO: USE THIS IN POST VIEW
  async getImageFromUser(name: string) {
    return this.fireStore
    .collection("user",ref => ref.where("firstname", "==", name).limit(1))
    .get()
    .subscribe(data=>data.forEach(el=> {
      let res = el.data();
      return res['img'];
    }));
  }

  async createPost(body: string, title: string, tribe: string, document: string, image: string) {
    var user = firebase.auth().currentUser;
    this.fireStore.collection('post').add({
      body: body,
      title: title,
      tribe: tribe,
      document: document,
      user: user?.uid,
      creator: user?.displayName,
      image: image,
      likes: 0,
      comments: 0
    })
    .catch(e => {
      console.log(e);
  })
}

  setPosts() {
    return this.fireStore.collection<Post>('post').snapshotChanges().pipe(
      map((res => res.map(el => {
        let post = el.payload.doc.data() as Post;
        post.uid = el.payload.doc.id;
        return post;
      })))
    )
  }

  getPosts() {
    return this.posts;
  }
  
  async editPostLikes(uid: string, likes: number) {
    this.fireStore.doc(`post/${uid}`).update({likes:likes});
  }

  async editPostComments(uid: string, comments: number) {
    this.fireStore.doc(`post/${uid}`).update({comments:comments});
  }
  
  getComments(postId: string) {
    return this.fireStore
      .collection<Comment>('comment')
      .snapshotChanges()
      .pipe(
        map((res) =>
          res.map((el) => {
            let comment = el.payload.doc
              .data() as Comment;
            comment.uid = el.payload.doc.id;
            return comment;
          })
        )
      );
    
  }

  async createComment(parentId: string, body: string) {
    var user = firebase.auth().currentUser;
    this.fireStore
      .collection('comment')
      .add({
        user: user?.displayName,
        parentId: parentId,
        body: body,
      })
      .catch((e) => {
        console.log(e);
      });
    this.user$.subscribe
  }

  async getSinglePost(id: string) {
    return this.fireStore
      .collection<Post>('post')
               .doc(id)
               .ref
               .get()
               .then((doc) => {
                return doc.data() as Post;
                })
                .catch((err) => {
                   console.error(err);
                });
  }

}
