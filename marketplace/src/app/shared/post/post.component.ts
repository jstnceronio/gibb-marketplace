import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { Post } from './post.model';

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
  
  isliked: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  private getIsliked(): boolean {
    return this.isliked;
  }
  // TODO: ADD LIKE & COMMENT FUNCTIONALITIES
  public addLikeToPost() {
    if (!this.getIsliked()) {
      this.likes = this.likes + 1;
      this.isliked = true;
    }
  }

  public addCommentToPost() {
    this.comments = this.comments + 1;
  }
  
}
