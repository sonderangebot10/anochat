import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

import * as uuid from 'uuid';

import { Room } from '../../../models/room.model';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rooms-window',
  templateUrl: './rooms-window.component.html',
  styleUrls: ['./rooms-window.component.sass']
})
export class RoomsWindowComponent implements OnInit {
  isLoading = true;

  user: firebase.User;
  rooms: Room[];

  error: string = '';

  registerForm: FormGroup;

  constructor(
    private afAuth: AngularFireAuth, 
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private router: Router) {
      afAuth.authState.subscribe(user => {
        this.user = user;
        this.afs.collection<Room>(`users/${user.uid}/rooms`).valueChanges().subscribe(data => {
          this.rooms = data;
        });
      });
      this.isLoading = false;
   }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      group_name: ['', Validators.required],
      group_password:['']
    })

    if(window.innerWidth > 600)
      this.router.navigate(['/']);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(window.innerWidth > 600)
      this.router.navigate(['/']);
  }

  onCreateRoom() {
    const roomInfo = this.registerForm.value;

    if(roomInfo.group_name == '')
    {
      this.error = 'Group name cannot be empty';
      return;
    }
    if(roomInfo.group_name.length > 15)
    {
      this.error = 'Group name cannot be longer than 15 characters';
      return;
    }

    const newRoom = {
      uid: uuid.v4(),
      displayName: roomInfo.group_name,
      password: roomInfo.group_password
    };

    var room = this.afs.firestore.doc(`users/${this.user.uid}/rooms/${roomInfo.group_name}`);

    room.get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          this.error = 'Room name already exist';
        }
        else if(this.rooms.length > 98) {
          this.error = 'Maximum number of rooms is 99';
        }
        else {
          room.set(newRoom, { merge: true });
        }
      });
  }

  onCloseRoom(roomName: string) {
    var room = this.afs.firestore.doc(`users/${this.user.uid}/rooms/${roomName}`);
    room.delete();
  }
}
