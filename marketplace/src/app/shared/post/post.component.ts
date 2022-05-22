import { Component, Input, OnInit } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../services/data.service'

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
  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  // TODO: ADD LIKE & COMMENT FUNCTIONALITIES
  async addLikeToPost() {
    if (this.isliked) {
      return await this.removeLikeFromPost();
    }
    else {
      this.likes = this.likes + 1;
      this.isliked = true;
      //window.alert(this.isliked + " and Likes: " + this.likes);
      //return await this.editPostData(this.uid, this.likes, this.comments);
    }
  }

  async removeLikeFromPost() {
    this.likes = this.likes - 1;
    this.isliked = false;
    //window.alert(this.isliked + " and Likes: " + this.likes);
    //return await this.editPostData(this.uid, this.likes, this.comments);
  }

  public addCommentToPost() {
    this.comments = this.comments + 1;
  }

  async editPostData(uid: string, likes: number, comments: number) {
    await this.dataService.editPostData(uid, likes, comments);
  }
}
