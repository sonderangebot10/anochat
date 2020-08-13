import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';

import { RoomsService } from '../rooms-window/room-window.service';

import { Room } from '../../../models/room.model';

@Component({
  selector: 'app-room-users-window',
  templateUrl: './room-users-window.component.html',
  styleUrls: ['./room-users-window.component.sass']
})
export class RoomUsersWindowComponent implements OnInit {

  room: Room;

  constructor(
    public roomsService: RoomsService,
    private router: Router) {
      roomsService.openRoomEmitter.subscribe(room => {
        this.room = room;
      })
   }

  ngOnInit(): void {
    if (window.innerWidth > 600) {
      this.router.navigate(['/']);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth > 600) {
      this.router.navigate(['/']);
    }
  }

}
