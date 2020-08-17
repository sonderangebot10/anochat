import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';

import * as firebase from 'firebase';

import { RoomService } from '../../services/room.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Room } from 'src/models/room.model';
import { AngularFireAuth } from '@angular/fire/auth';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.sass']
})
export class ChatWindowComponent implements OnInit {

  user: firebase.User;
  room: Room;
  messageValue: string;

  constructor(
    private afAuth: AngularFireAuth,
    public roomService: RoomService,
    private router: Router,
    private afs: AngularFirestore,
    public date: DatePipe) {
      roomService.openRoomEmitter.subscribe(room => {
        this.afs.collection<Room>(`rooms`).valueChanges().subscribe(data => {
          this.room = data.find(x => x.ownerId === room.ownerId && x.displayName === room.displayName);
        });
      });

      afAuth.authState.subscribe(user => {
        this.user = user;
      });
   }

   ngOnInit(): void {
    if (window.innerWidth > 1000) {
      this.router.navigate(['/']);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth > 1000) {
      this.router.navigate(['/']);
    }
  }

  onSend() {
    this.roomService.sendMessage(this.messageValue);
  }

}
