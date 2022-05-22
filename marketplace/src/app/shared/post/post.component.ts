import { Component, Input, OnInit } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service'
import { Comment } from '../../comment/comment.model'
import { filter } from 'rxjs/operators';
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
  @Input() uid: string='';
  
  private isliked: boolean = false;
  private commentsOfPost: Observable<Comment[]> | null;
  
  constructor(private dataService: DataService) { 
    this.commentsOfPost = dataService.getComments(this.uid);
  }

  ngOnInit(): void {
  }

  // TODO: ADD LIKE & COMMENT FUNCTIONALITIES
  async addLikeToPost() {
    if (this.isliked) {
      return this.removeLikeFromPost();
    }
    else {
      this.likes = this.likes + 1;
      this.isliked = true;
      //window.alert(this.isliked + " and Likes: " + this.likes);
      return await this.dataService.editPostLikes(this.uid, this.likes);
    }
  }

  async removeLikeFromPost() {
    this.likes = this.likes - 1;
    this.isliked = false;
    //window.alert(this.isliked + " and Likes: " + this.likes);
    return await this.dataService.editPostLikes(this.uid, this.likes);
  }

  async addCommentToPost() {
    this.comments = this.comments + 1;
    return await this.dataService.editPostComments(this.uid, this.comments);
  }
}
