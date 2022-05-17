import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  /* FONTAWESOME ICONS*/
  faUserAstronaut = faUserAstronaut;
  faThumbsUp = faThumbsUp;
  faComments = faComments;

  /* PARAMETERS */
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() text: string = '';
  @Input() likes: number = 0;
  @Input() comments: number = 0;
  
  constructor(private firestore: AngularFirestore) { }

  ngOnInit(): void {
   
  }

  // TODO: ADD LIKE & COMMENT FUNCTIONALITIES
  public addLikeToPost() {
    this.likes = this.likes + 1;
  }

  public addCommentToPost() {
    this.comments = this.comments + 1;
  }
}
