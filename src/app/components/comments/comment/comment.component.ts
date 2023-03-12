import { Component, Input, OnInit } from '@angular/core';
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
  currentUser!: CurrentUser;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.dataService.getData().subscribe((data) => {
      this.currentUser = data.currentUser;
    });
  }
}
