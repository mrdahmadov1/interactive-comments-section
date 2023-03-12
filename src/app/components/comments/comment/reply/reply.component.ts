import { Component, Input, OnInit } from '@angular/core';
import { CurrentUser } from 'src/app/models/currentUser';
import { Reply } from 'src/app/models/reply';

@Component({
  selector: 'reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss'],
})
export class ReplyComponent implements OnInit {
  @Input() reply!: Reply;
  @Input() currentUser: CurrentUser | undefined;

  constructor() {}

  ngOnInit(): void {}
}
