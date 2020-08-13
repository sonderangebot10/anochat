import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';

import { RoomService } from '../../services/room.service';

import { Room } from '../../../models/room.model';

@Component({
  selector: 'app-room-users-window',
  templateUrl: './room-users-window.component.html',
  styleUrls: ['./room-users-window.component.sass']
})
export class RoomUsersWindowComponent implements OnInit {

  room: Room;

  constructor(
    public roomService: RoomService,
    private router: Router) {
      roomService.openRoomEmitter.subscribe(room => {
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
