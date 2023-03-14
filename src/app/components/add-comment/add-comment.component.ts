import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CurrentUser } from 'src/app/models/currentUser';
import { DataService } from 'src/app/services/data.service';
import { Comment } from 'src/app/models/comment';
import { Reply } from 'src/app/models/reply';
@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
  @Input() replyingTo: string | undefined;
  @Output() newReply = new EventEmitter<any>();
  currentUser: CurrentUser = this.dataService.currentUser;
  comments: Comment[] = this.dataService.comments;
  content = new FormControl();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  addNewComment() {
    this.comments.push({
      id: this.getMaxId(this.comments) + 1,
      content: this.content.value,
      createdAt: 'today',
      score: 0,
      user: this.currentUser,
      replies: [],
    });

    this.dataService.setCommentsToLocalStorage(this.comments);
  }

  addNewReply(replyingTo: string) {
    const comment = this.getCommentByUsername(replyingTo);
    (comment?.replies as Reply[]).push({
      id: this.getMaxId(comment?.replies) + 1,
      content: this.content.value,
      createdAt: 'today',
      score: 0,
      user: this.currentUser,
      replyingTo: replyingTo,
    });

    this.dataService.setCommentsToLocalStorage(this.comments);
  }

  submitComment() {
    if (this.replyingTo) {
      this.addNewReply(this.replyingTo);
    } else {
      this.addNewComment();
    }

    this.newReply.emit();
    this.content.reset();
  }

  getCommentByUsername(username: string): Comment | undefined {
    return this.comments.find(
      (comment) =>
        comment.user.username === username ||
        comment.replies.find((reply) => reply.user.username === username)
    );
  }

  getMaxId(items: any): number {
    return Math.max(...items.map((item: any) => item.id), 0);
  }
}
