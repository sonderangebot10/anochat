import { Component, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent {
  @Input() public navbarCollapsed: boolean;

  constructor(public auth: AuthService, public router: Router, public headerService: HeaderService) {
    this.headerService.change.subscribe(isOpen => {
      this.navbarCollapsed = isOpen;
    });
  }
}
