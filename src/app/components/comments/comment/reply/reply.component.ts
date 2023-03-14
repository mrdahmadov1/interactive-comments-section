import { Component, Input, OnInit } from '@angular/core';
import { CurrentUser } from 'src/app/models/currentUser';
import { Reply } from 'src/app/models/reply';
import { DataService } from 'src/app/services/data.service';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],
})
export class ReplyComponent implements OnInit {
  @Input() reply!: Reply;
  @Input() currentUser: CurrentUser | undefined;
  comments: Comment[] = this.dataService.comments;
  isReply: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  newReply() {
    this.isReply = !this.isReply;
  }

  deleteReply(chosenReply: Reply) {
    this.comments = this.comments.filter((comment) => {
      comment.replies = comment.replies.filter(
        (reply) => reply.id !== chosenReply.id
      );
      return comment;
    });

    this.dataService.setCommentsToLocalStorage(this.comments);
  }

  editReply(chosenReply: Reply) {}
}
