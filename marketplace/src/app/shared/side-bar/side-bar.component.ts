import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { faUserAstronaut, faHouse, faIdCard, faBook } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  faUserAstronaut = faUserAstronaut;
  faHouse = faHouse;
  faIdCard = faIdCard;
  faBook = faBook;

  public isLoggedIn = false;

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.auth.user$.subscribe((user: any) => {
      this.isLoggedIn = user && user.firstname;
    })
  }
}
