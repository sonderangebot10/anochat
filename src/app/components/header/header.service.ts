import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HeaderService {

  private isOpen = false;

  @Output() isOpenEmitter: EventEmitter<boolean> = new EventEmitter();

  toggle() {
    this.isOpen = !this.isOpen;
    this.isOpenEmitter.emit(this.isOpen);
  }

  close() {
    if (this.isOpen) {
        this.isOpen = !this.isOpen;
        this.isOpenEmitter.emit(this.isOpen);
    }
  }

}
