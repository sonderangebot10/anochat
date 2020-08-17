import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import * as uuid from 'uuid';

import { DatePipe } from '@angular/common';

import { Room } from '../../models/room.model';
import { defaultThrottleConfig } from 'rxjs/internal/operators/throttle';

@Injectable({ providedIn: 'root' })
export class RoomService {

  private openRoom: Room;
  user: firebase.User;
  rooms: Room[];

  @Output() openRoomEmitter: EventEmitter<Room> = new EventEmitter();

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public datepipe: DatePipe) {
        afAuth.authState.subscribe(user => this.user = user);
        this.afs.collection<Room>(`rooms`).valueChanges().subscribe(data => {
          this.rooms = data;
        });
   }

  toggle(room: Room) {
    this.openRoom = room;
    this.openRoomEmitter.emit(this.openRoom);
  }

  getRoom() {
    return this.openRoom;
  }

  removeUser(username: string) {
    this.afs.firestore.collection(`rooms`).doc(this.openRoom.uid).update({
        guests: firebase.firestore.FieldValue.arrayRemove(username)
    }).then(_ => {
        const updatedRoom = this.rooms.find(x => x.ownerId === this.user.uid && x.displayName === this.openRoom.displayName);
        this.toggle(updatedRoom);
    });
  }

  sendMessage(messageContent: string) {
    const newMessage = {
      uid: uuid.v4(),
      timestamp: this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss'),
      message: messageContent,
      ownerId: this.user.uid,
      ownerName: this.user.displayName
    };

    this.afs.firestore.collection(`rooms`).doc(this.openRoom.uid).update({
      messages: firebase.firestore.FieldValue.arrayUnion(newMessage)
    });
  }
}
