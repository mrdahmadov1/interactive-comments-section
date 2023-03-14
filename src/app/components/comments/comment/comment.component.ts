import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { CurrentUser } from 'src/app/models/currentUser';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment | any;
  @Output() getComments = new EventEmitter<any>();
  currentUser: CurrentUser = this.dataService.currentUser;
  comments: Comment[] = this.dataService.comments;
  isReply: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  newReply() {
    this.isReply = !this.isReply;
  }

  deleteComment(chosenComment: Comment) {
    this.comments = this.comments.filter((comment) => {
      return comment.id !== chosenComment.id;
    });

    this.dataService.setCommentsToLocalStorage(this.comments);
    this.getComments.emit();
  }

  editComment(chosenComment: Comment) {}
}
