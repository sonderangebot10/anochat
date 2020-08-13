import { Component, OnInit } from '@angular/core';

import { RoomsService } from '../rooms-window/room-window.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.sass']
})
export class ChatWindowComponent implements OnInit {

  constructor(public roomsService: RoomsService) { 
    
  }

  ngOnInit(): void {
  }

}
