import { Component, inject } from '@angular/core';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  onSnapshot,
} from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc, Unsubscribe } from 'firebase/firestore';
import { User } from '../../models/user.class';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userId: string | undefined | null;
  docRef: DocumentReference<DocumentData> | null = null;
  dialog = inject(MatDialog);
  firestore: Firestore = inject(Firestore);
  user: User = new User();
  unsub!: Unsubscribe;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id');
      console.log('user id ist', this.userId);
      this.getUser();
    });
  }

  ngOnDestroy(): void {
      this.unsub();

  }

  getUser() {
    if (this.userId) {
      this.docRef = doc(this.firestore, 'users', this.userId);
      this.unsub = onSnapshot(this.docRef, (docSnap) => {
        if (docSnap.exists()) {
          this.user = docSnap.data() as User;
        }
      });
  }}

  editUser() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user);
    if (this.userId) dialog.componentInstance.userId = this.userId;
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user); // diese syntax erstellt eine Kopie von den nutzer
    if (this.userId) dialog.componentInstance.userId = this.userId;
  }
}
