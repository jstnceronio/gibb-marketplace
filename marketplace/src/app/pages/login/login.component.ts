import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit(): void {
    if (this.auth.user$) {
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/register'])
    }
  }
}
