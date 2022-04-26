import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  firstname: string = ' ';
  lastname: string = ' ';
  username: string = ' ';
  department: string = ' ';

  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

}
