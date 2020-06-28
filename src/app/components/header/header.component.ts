import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})

export class HeaderComponent {
  @Input() public navbarCollapsed: boolean;
  @Output() navbarEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(public auth: AuthService, public router: Router) {
    this.navbarCollapsed = true;
  }

  collapseNavbar() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  emit() {
    this.navbarEventEmitter.emit(this.navbarCollapsed);
  }
}
