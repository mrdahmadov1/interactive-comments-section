import { Component, OnInit } from '@angular/core';
import { CurrentUser } from 'src/app/models/currentUser';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
  currentUser: CurrentUser | undefined;

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
