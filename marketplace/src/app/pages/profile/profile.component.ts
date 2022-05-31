import { Component, OnInit } from '@angular/core';
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/services/user.model';
import { FormBuilder, FormGroup, Validators, } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  /* FONTAWESOME ICONS*/
  faUserAstronaut = faUserAstronaut;
  /* FORM VARIABLES */
  public _firstname = ' '
  public _lastname = ' ';
  public _username = ' ';
  public _department = ' ';
  public _img = null;
  public profileForm!: FormGroup
  fileToUpload: File | null = null;
  filePath = '';

  constructor(public auth: AuthService, public router: Router, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();

    this.auth.user$.subscribe((user: any) => {
      if (user) {        
        this.fillUserData(user);
      }
    });
  }

  private fillUserData(user: User) {
    this.profileForm.controls['firstname'].setValue(user.firstname);
    this.profileForm.controls['lastname'].setValue(user.name);
    this.profileForm.controls['username'].setValue(user.username);
    this.profileForm.controls['department'].setValue(user.school);
    this.filePath = user.img;
  }

  private buildForm() {
    this.profileForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      department: ['', Validators.required],
      img: [null],
    });
  }

  async editData() {
    this._firstname = this.profileForm.get('firstname')!.value;
    this._lastname = this.profileForm.get('lastname')!.value;
    this._username = this.profileForm.get('username')!.value;
    this._department = this.profileForm.get('department')!.value;

    return await this.auth.editUserData(this._firstname, this._lastname, this._username, this._department, this.filePath);
  }

  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];

    this.profileForm.patchValue({
      img: file
    });

    this.profileForm.get('img').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(file);
  }
}
