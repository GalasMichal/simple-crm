import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { collection, DocumentData, Firestore, QuerySnapshot } from '@angular/fire/firestore';
import { doc, onSnapshot } from "firebase/firestore";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIcon, MatButtonModule, MatTooltipModule, MatDialogModule, MatCardModule, CommonModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);
  readonly dialog = inject(MatDialog);
  firestore: Firestore = inject(Firestore);
  user = new User();
  allUsers: User[] = [];
  unsub: any;
  constructor() {}

  ngOnInit(): void {
     this.unsub = onSnapshot(this.getUsersRef(), (snapshot: QuerySnapshot<DocumentData>) => {
      this.allUsers = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        const user = new User(data);
        user.id = doc.id;
        this.allUsers.push(user);
        console.log('Received changes from DB', user);
      });
    });
  }

  getUsersRef(){
    return collection(this.firestore, 'users')
  }

 ngOnDestroy(): void {
   this.unsub()
 }

  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }
}
