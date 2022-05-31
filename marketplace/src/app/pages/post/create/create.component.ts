import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from "@angular/forms";
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public _title = ' ';
  public _content = ' ';
  public _tribe = ' ';

  public createPostForm!: FormGroup
  
  constructor(private router: Router, private formBuilder : FormBuilder, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.createPostForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tribe: ['Alle tribes', Validators.required],
    })
    this._title = history.state.title;
    this.createPostForm.controls['title'].setValue(this._title)
  }

  async pushPost() {
    console.log("push");
    this._title = this.createPostForm.get('title')!.value;
    this._content = this.createPostForm.get('content')!.value;
    this._tribe = this.createPostForm.get('tribe')!.value;

    await this.dataService.createPost(this._content, this._title, this._tribe, '', '')
    console.log("done")
    this.router.navigateByUrl('/')
  }

  goBack() {
    this.router.navigateByUrl('/')
  }
}
