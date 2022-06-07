import { Component, Input, OnInit } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service'
import { Comment } from '../../pages/post/comment/comment.model'
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
  @Input() user: string='';
  @Input() creator: string = '';

  tribe: string = ''
  
  private isliked: boolean = false;
  public commentsOfPost: Observable<Comment[]> | null;
  public filePath = 'undefined';

  constructor(private dataService: DataService, private fireStore: AngularFirestore) { 
    this.commentsOfPost = dataService.getComments(this.uid);
    this.commentsOfPost = this.filterComments();
  }

  ngOnInit(): void {
    // TODO: USE FUNCTION IN DATA SERVICE
    if (this.creator) { // FOR THE OLD POSTS THAT DON'T HAVE CREATORS YET
      this.fireStore
      .collection("user",ref => ref.where("uid", "==", this.user).limit(1))
      .get()
      .subscribe(data=>data.forEach(el=> {
        let res = el.data();
        this.filePath = res['img'];
        console.log(this.filePath);
      }));
    }
    this.checkTribe()
  }

  checkTribe() {
    if (this.subtitle == '1') {
      this.tribe = 'General'
    } else if (this.subtitle == '2') {
      this.tribe = 'Memes'
    } else {
      this.tribe = 'Tests'
    }
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

  filterComments() {
    let newcomments = this.commentsOfPost.pipe (
      map(items => 
       items.filter(comment => comment.parentId === this.uid)) 
    );
    return newcomments;  
  }
}
