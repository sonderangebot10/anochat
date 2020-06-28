import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  navbarState: boolean;

  collapseHeader() {
    this.navbarState = false;
  }

  public onClose(value: boolean): void {
    this.navbarState = value;
  }
}
