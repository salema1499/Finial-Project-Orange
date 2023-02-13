import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import User from 'src/app/models/user.interface';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input('user') user: User | undefined;
  @Output('onDelete') onDelete = new EventEmitter();
  callingApi = false;
  constructor() {}

  ngOnInit(): void {}

  deleteUser() {
    this.callingApi = true;
    this.onDelete.emit(this.user?._id);
  }
}
