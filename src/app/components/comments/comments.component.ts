import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = this.dataService.comments;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  getComments() {
    console.log(this.comments);
    this.comments = this.dataService.getCommentsFromLocalStorage();
  }
}
