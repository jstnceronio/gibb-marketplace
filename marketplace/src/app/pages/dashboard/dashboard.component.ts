import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    // EXAMPLE ON HOW TO ACCESS USER IN BACKEND
    /*
    this.auth.user$.subscribe((user: any) => {
      if (user) {
      }
    });
     */
  }

  async createPost() {
    console.log('creating post..')
    await this.dataService.createPost('body', 'title1', 'memes', 'null', 'null')
  }
}
