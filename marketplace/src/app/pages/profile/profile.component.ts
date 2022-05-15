import { Component, OnInit } from '@angular/core';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  /* FONTAWESOME ICONS*/
  faUserAstronaut = faUserAstronaut;
  
  constructor() { }

  ngOnInit(): void {
  }

}
