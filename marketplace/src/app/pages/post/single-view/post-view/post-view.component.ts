import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Post } from 'src/app/shared/post/post.model';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent implements OnInit {
  private routeSub: Subscription;
  private id: string;
  public post: any;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

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
}
