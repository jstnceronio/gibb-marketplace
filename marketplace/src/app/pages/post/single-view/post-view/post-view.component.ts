import { Component, OnInit } from '@angular/core';
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
  private routeSub: Subscription;
  private id: string;
  public post: any;
  public comments: Observable<Comment[]> | null

  constructor(private route: ActivatedRoute, private dataService: DataService) {
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
}
