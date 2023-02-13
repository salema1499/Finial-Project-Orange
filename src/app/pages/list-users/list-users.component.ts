import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/user.interface';
import AuthService from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  users: User[] = [];
  callingApi = true;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.listUsers().subscribe(
      (res: any) => {
        this.users = res;
        this.callingApi = false;
      },
      (err) => {
        if (err && err.error?.message) {
          alert(err.error?.message);
        } else {
          alert('something went wrong');
        }
      }
    );
  }

  deleteUser(userID: string) {
    this.callingApi = true;
    this.auth.deleteUser(userID).subscribe(
      () => {
        this.users = this.users.filter((u) => u._id !== userID);
      },
      (err) => {
        if (err && err.error?.message) {
          alert(err.error?.message);
        } else {
          alert("can't delete this user now");
        }
      }
    );
  }
}
