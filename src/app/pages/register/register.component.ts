import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AuthService from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  callingApi = false;
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    this.callingApi = true;
    this.authService
      .register(this.email, this.password, this.username)
      .subscribe(
        () => {
          this.callingApi = false;
          this.router.navigateByUrl('/login');
        },
        (err) => {
          if (err && err.error?.message) {
            alert(err.error?.message);
          } else {
            alert('something went wrong');
          }
          this.callingApi = false;
        }
      );
  }
}
