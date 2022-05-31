import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Post } from 'src/app/shared/post/post.model';

@Component({
  selector: 'app-profile-post-view',
  templateUrl: './profile-post-view.component.html',
  styleUrls: ['./profile-post-view.component.scss']
})
export class ProfilePostViewComponent implements OnInit {
  posts: Observable<Post[]>;

  constructor(private dataService: DataService, private authService: AuthService) {
    this.posts = this.getPosts();
    console.log(this.posts)
  }

  ngOnInit(): void {
    this.filterPosts()
  }

  getPosts() {
    return this.dataService.getPosts();
  }

  async filterPosts() {
    let posts = this.getPosts()
    let creator = this.authService.getCurrentUser();
    
    let filteredPosts = posts.pipe (
      map(items => 
       items.filter(post => post.creator === creator)) 
    );
    this.posts =  filteredPosts;
  }

}
