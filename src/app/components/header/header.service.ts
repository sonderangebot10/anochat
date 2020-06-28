import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HeaderService {

  private isOpen = false;

  @Output() isOpenEmitter: EventEmitter<boolean> = new EventEmitter();

  toggle() {
    console.log('toggle');
    this.isOpen = !this.isOpen;
    this.isOpenEmitter.emit(this.isOpen);
  }

  close() {
    console.log('close');
    if (this.isOpen) {
        this.isOpen = !this.isOpen;
        this.isOpenEmitter.emit(this.isOpen);
    }
  }

}
