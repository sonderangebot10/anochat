import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import * as uuid from 'uuid';

import { DatePipe } from '@angular/common';

import { Room } from '../../../models/room.model';
import { Message } from '../../../models/message.model';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-rooms-window',
  templateUrl: './rooms-window.component.html',
  styleUrls: ['./rooms-window.component.sass']
})
export class RoomsWindowComponent implements OnInit {
  isLoading = true;

  user: firebase.User;
  rooms: Room[];

  error = '';

  registerForm: FormGroup;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private router: Router,
    public roomService: RoomService,
    public datepipe: DatePipe) {
      afAuth.authState.subscribe(user => {
        this.user = user;
        this.afs.collection<Room>(`rooms`).valueChanges().subscribe(data => {
          this.rooms = data;

          if (roomService.getRoom() == null) {
            if (data.length > 0) {
              roomService.toggle(data[0]);
            }
          }
        });
      });
      this.isLoading = false;
   }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      group_name: ['', Validators.required],
      group_password: ['']
    });

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

  onCreateRoom() {
    const roomInfo = this.registerForm.value;
    this.error = '';

    if (roomInfo.group_name === '')
    {
      this.error = 'Group name cannot be empty';
      return;
    }
    if (roomInfo.group_name.length > 15)
    {
      this.error = 'Group name cannot be longer than 15 characters';
      return;
    }

    const createRoomMessage = {
      uid: uuid.v4(),
      timestamp: this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'),
      message: 'The room has been created',
      ownerId: '',
      ownerName: ''
    };

    const uid = uuid.v4();
    const newRoom = {
      uid,
      displayName: roomInfo.group_name,
      password: roomInfo.group_password,
      owner: this.user.displayName,
      ownerId: this.user.uid,
      guests: [],
      messages: [createRoomMessage]
    };

    if (this.rooms.find(x => x.ownerId === this.user.uid && x.displayName === roomInfo.displayName))
    {
      return this.error = 'Room name already exist';
    }
    else if (this.rooms.length > 98) {
      return this.error = 'Maximum number of rooms is 99';
    }

    const room = this.afs.firestore.doc(`rooms/${uid}`);

    room.get()
      .then(_ => room.set(newRoom, { merge: true }).then(ss => this.roomService.toggle(newRoom)));
  }

  onCloseRoom(roomName: string) {
    const roomToDelete = this.rooms.find(x => x.ownerId === this.user.uid && x.displayName === roomName);

    this.afs.firestore.doc(`rooms/${roomToDelete.uid}`).delete()
    .then(_ => {
      if (this.rooms.length > 0) {
        if (this.rooms[0].displayName === roomName)
        {
            this.roomService.toggle(this.rooms[1]);
        }
        else {
          this.roomService.toggle(this.rooms[0]);
        }
      }
      else {
        this.roomService.toggle(null);
      }
    });
  }
}
