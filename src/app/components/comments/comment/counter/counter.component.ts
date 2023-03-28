import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reply } from 'src/app/models/reply';
import { DataService } from 'src/app/services/data.service';
import { Comment } from '../../../../models/comment';
@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  @Input() countedComment!: Comment | Reply;
  comments: Comment[] = this.dataService.comments;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  increaseScore() {
    this.countedComment.score++;
    this.sort();
  }

  decreaseScore() {
    if (this.countedComment.score === 0) {
      return;
    }
    this.countedComment.score--;
    this.sort();
  }

  sort() {
    this.comments.sort(function (a, b) {
      return b.score - a.score;
    });

    this.comments.map((comment) => {
      comment.replies.sort(function (a, b) {
        return b.score - a.score;
      });
    });

    this.dataService.setCommentsToLocalStorage(this.comments);
  }
}
