import { Component, OnInit } from '@angular/core';

import { RoomService } from '../../services/room.service';
import { Room } from 'src/models/room.model';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.sass']
})
export class ChatWindowComponent implements OnInit {

  room: Room;

  constructor(public roomService: RoomService) {
    roomService.openRoomEmitter.subscribe(room => this.room = room);
  }

  ngOnInit(): void {
  }

}
