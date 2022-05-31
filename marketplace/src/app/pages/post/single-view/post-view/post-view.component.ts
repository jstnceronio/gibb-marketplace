import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Post } from 'src/app/shared/post/post.model';
import { Comment } from '../../comment/comment.model';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
  @Output() newComment = new EventEmitter();
  
  private routeSub: Subscription;
  private id: string;
  public post: any;
  public comments: Observable<Comment[]> | null
  private commentbody: string;
  
  public commentForm!: FormGroup

  constructor(private route: ActivatedRoute, private dataService: DataService, private formBuilder : FormBuilder) {
    this.commentForm = this.formBuilder.group({
      body: ['', Validators.required],
    })

    this.comments = this.dataService.getComments(this.id);
    this.comments = this.filterComments();
  }

  async ngOnInit(): Promise<void> {
    this.routeSub = this.route.params.subscribe(params => {
      this.id = params['id']      
    })
    console.log(this.id)
    await this.dataService.getSinglePost(this.id).then(data => {
      this.post = data
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  filterComments() {
    let newcomments = this.comments.pipe (
      map(items => 
       items.filter(comment => comment.parentId === this.id)) 
    );
    return newcomments;  
  }

  async postComment() {
    this.commentbody = this.commentForm.get('body')!.value;
    this.dataService.createComment(this.id, this.commentbody);
    this.commentForm.reset();
    return this.newComment.emit();
  }
}
