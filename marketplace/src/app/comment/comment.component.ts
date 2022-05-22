import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from './comment.model'
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() user: string = '';
  @Input() body: string = '';

  commentsOfPost: Observable<Comment[]> | null | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
