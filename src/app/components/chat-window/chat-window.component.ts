import { Component, OnInit } from '@angular/core';

import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.sass']
})
export class ChatWindowComponent implements OnInit {

  constructor(public roomService: RoomService) { 

  }

  ngOnInit(): void {
  }

}
