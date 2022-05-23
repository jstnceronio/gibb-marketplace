import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators, } from "@angular/forms";
import { DataService } from '../services/data.service'

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {
  @Input() postId: string = '';
  @Output() newComment = new EventEmitter();
  private commentbody: string;
  public commentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) { }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      body: ['', Validators.required],
    });
  }

  async createComment() {
    this.commentbody = this.commentForm.get('body')!.value;
    this.dataService.createComment(this.postId, this.commentbody);
    return this.newComment.emit();
  }
}
