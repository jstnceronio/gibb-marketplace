import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { DataService } from 'src/app/services/data.service';
import { PostComponent } from '../../shared/post/post.component'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { Observable} from 'rxjs';
import { Post } from '../../shared/post/post.model'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  posts: Observable<Post[]>;

  constructor(public auth: AuthService, private router: Router, private dataService: DataService) { 
    this.posts = this.getPosts();
    console.log(this.posts)
  }

  ngOnInit(): void {
    // EXAMPLE ON HOW TO ACCESS USER IN BACKEND
    /*
    this.auth.user$.subscribe((user: any) => {
      if (user) {
      }
    });
     */
  }

  async createPostRedirect(title: string) {
    await this.router.navigateByUrl('/create', {
      state: { title: title }
    })
  }

  getPosts() {
    return this.dataService.getPosts();
  }
  updatePost() {
    //return this.posts.filter(t => !t.doneDate).length / this.todoListService.todos.length * 100;
    
  }
  
}
