import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  comments: Comment[] | undefined;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.dataService.getData().subscribe((data) => {
      this.comments = data.comments;
    });
  }
}
