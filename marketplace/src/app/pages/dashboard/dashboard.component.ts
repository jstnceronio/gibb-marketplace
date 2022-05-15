import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import { DataService } from 'src/app/services/data.service';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

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

  async createPost(title: string) {
    // TITLE IS OPTIONAL SO IT MAY BE EMPTY
    await this.dataService.createPost('body', title, 'memes', 'null', 'null')
  }
}
