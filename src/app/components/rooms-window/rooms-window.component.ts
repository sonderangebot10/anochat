import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import * as uuid from 'uuid';

import { Room } from '../../../models/room.model';
import { RoomsService } from './room-window.service';

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
    public roomsService: RoomsService) {
      afAuth.authState.subscribe(user => {
        this.user = user;
        this.afs.collection<Room>(`users/${user.uid}/rooms`).valueChanges().subscribe(data => {
          this.rooms = data;

          if(roomsService.getRoom() == null) {
            if(data.length > 0) {
              roomsService.toggle(data[0]);
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

    const newRoom = {
      uid: uuid.v4(),
      displayName: roomInfo.group_name,
      password: roomInfo.group_password,
      owner: this.user.displayName,
      guests: []
    };

    const room = this.afs.firestore.doc(`users/${this.user.uid}/rooms/${roomInfo.group_name}`);

    room.get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          this.error = 'Room name already exist';
        }
        else if (this.rooms.length > 98) {
          this.error = 'Maximum number of rooms is 99';
        }
        else {
          room.set(newRoom, { merge: true }).then(_ => this.roomsService.toggle(newRoom));
        }
      });
  }

  onCloseRoom(roomName: string) {
    this.afs.firestore.doc(`users/${this.user.uid}/rooms/${roomName}`).delete()
    .then(_ => {
      if(this.rooms.length > 0) {
        if(this.rooms[0].displayName === roomName)
        {
            this.roomsService.toggle(this.rooms[1]);
        }
        else {
          this.roomsService.toggle(this.rooms[0]);
        }
      }
      else {
        this.roomsService.toggle(null);
      }
    });
  }
}
