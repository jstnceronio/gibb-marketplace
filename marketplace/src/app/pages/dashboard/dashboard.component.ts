import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { DataService } from 'src/app/services/data.service';
import { map, Observable} from 'rxjs';
import { Post } from '../../shared/post/post.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostComponent } from 'src/app/shared/post/post.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  posts: Observable<Post[]>;
  public filterForm!: FormGroup;

  public tribes = PostComponent.tribes;

  constructor(public auth: AuthService, private router: Router, private dataService: DataService, private formBuilder : FormBuilder) {
    this.posts = this.getPosts();
  }

  ngOnInit(): void {
    this.filterForm = this.formBuilder.group({
      selectedTribe: ['Alle Tribes', Validators.required],
    });
  }

  async createPostRedirect(title: string) {
    await this.router.navigateByUrl('/create', {
      state: { title: title }
    })
  }

  getPosts() {
    return this.dataService.getPosts();
  }

  async filterPosts() {
    let posts = this.getPosts()
    let tribe = this.filterForm.get('selectedTribe')!.value;
    if (tribe === "Alle Tribes") {
      return this.posts = posts;
    }
    let filteredPosts = posts.pipe (
      map(items =>
       items.filter(post => post.tribe === tribe))
    );
    this.posts =  filteredPosts;
  }
}
