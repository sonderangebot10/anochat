import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  groupIdValue: string;

  constructor(public auth: AuthService, private router: Router) {
    if (auth.user$) {
      this.router.navigate(['/user']);
    }
  }

  onJoin() {
    console.log(this.groupIdValue);
  }
}
