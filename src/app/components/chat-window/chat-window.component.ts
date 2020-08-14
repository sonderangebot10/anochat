import { Component, OnInit } from '@angular/core';

import { RoomService } from '../../services/room.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Room } from 'src/models/room.model';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.sass']
})
export class ChatWindowComponent implements OnInit {

  room: Room;
  messageValue: string;

  constructor(
    public roomService: RoomService,
    private router: Router,
    private afs: AngularFirestore) {
      roomService.openRoomEmitter.subscribe(room => {
        this.afs.collection<Room>(`rooms`).valueChanges().subscribe(data => {
          this.room = data.find(x => x.ownerId === room.ownerId && x.displayName === room.displayName);
        });
      });
   }

  ngOnInit(): void {
  }

  onSend() {
    this.roomService.sendMessage(this.messageValue);
  }

}
