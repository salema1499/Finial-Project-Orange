import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AuthService from 'src/app/services/auth.service';
import storageKeys from 'src/app/shared/storageKeys';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  callingApi = false;
  email: string = '';
  password: string = '';
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    if (this.email && this.password) {
      this.callingApi = true;
      this.authService.login(this.email, this.password).subscribe(
        (res: any) => {
          this.callingApi = false;
          this.authService.setUserData(res.token);
          this.router.navigateByUrl('/home');
        },
        (err) => {
          if (err.error.message) {
            alert(err.error.message);
          } else {
            alert('Somthing went wrong');
          }
          this.callingApi = false;
        }
      );
    }
  }
}
