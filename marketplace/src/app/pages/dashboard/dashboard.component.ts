import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router) {
    // Navigate user to login if not logged in
    // TODO: THIS CAN BE REPLACED WITH (A MORE CLEAN) AUTH-GUARD SERVICE
    auth.user$.subscribe((user: any) => {
      if (!user) {
        router.navigate(['/login']);
      }
    });
  }

  ngOnInit(): void {

  }

}
