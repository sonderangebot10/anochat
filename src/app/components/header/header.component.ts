import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent {
  constructor(public auth: AuthService, public router: Router) {

  }

  onC()
  {
    console.log('XXX');
  }
}
