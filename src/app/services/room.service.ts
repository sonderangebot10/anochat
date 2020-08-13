import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

import { Room } from '../../models/room.model';

@Injectable({ providedIn: 'root' })
export class RoomService {

  private openRoom: Room; 
  user: firebase.User;  
  rooms: Room[];

  @Output() openRoomEmitter: EventEmitter<Room> = new EventEmitter();

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) {
        afAuth.authState.subscribe(user => {
            this.user = user;

            this.afs.collection<Room>(`users/${user.uid}/rooms`).valueChanges().subscribe(data => {
                this.rooms = data;
            });
        })
   }

  toggle(room: Room) {
    this.openRoom = room;
    this.openRoomEmitter.emit(this.openRoom);
  }

  getRoomName() {
    if(this.openRoom == null) {
        return "No room selected";
    }

    return this.openRoom.displayName;
  }

  getRoom() {
    return this.openRoom;
  }

  getRoomOwner() {
    if(this.rooms == null) {
      return "No room selected";
    }
    
    const updatedRoom = this.rooms.find(x => x.displayName === this.openRoom.displayName);

    if(updatedRoom == null) {
        return "No room selected";
    }

    return updatedRoom.owner;
  }

  getRoomUsers() {
    if(this.rooms == null) {
      return [];
    }

    const updatedRoom = this.rooms.find(x => x.displayName === this.openRoom.displayName)
    
    if(updatedRoom == null) {
        return [];
    }
    
    return updatedRoom.guests;
  }

  removeUser(username: string) {
    this.afs.firestore.collection(`users/${this.user.uid}/rooms`).doc(this.openRoom.displayName).update({
        "guests": firebase.firestore.FieldValue.arrayRemove(username)
    }).then(_ => {
        const updatedRoom = this.rooms.find(x => x.displayName === this.openRoom.displayName)
        this.toggle(updatedRoom);
    });
    
  }

}
