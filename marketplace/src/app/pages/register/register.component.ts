import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators, } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public _firstname = ' '
  public _lastname = ' ';
  public _username = ' ';
  public _department = ' ';
  public registrationForm!: FormGroup

  constructor(public auth: AuthService, public router: Router, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      department: ['', Validators.required]
    });
  }

  async editData() {
    this._firstname = this.registrationForm.get('firstname')!.value;
    this._lastname = this.registrationForm.get('lastname')!.value;
    this._username = this.registrationForm.get('username')!.value;
    this._department = this.registrationForm.get('department')!.value;

    return await this.auth.editUserData(this._firstname, this._lastname, this._username, this._department);
  }
}
