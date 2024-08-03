import { Component, inject } from '@angular/core';
import {
  DocumentData,
  DocumentReference,
  Firestore,
} from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc } from 'firebase/firestore';
import { User } from '../../models/user.class';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userId: string | null = null;
  docRef: DocumentReference<DocumentData> | null = null;
  firestore: Firestore = inject(Firestore);
  user: User = new User();
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id');
      console.log('user id ist', this.userId);
      this.getUser();
    });
  }

  async getUser() {
    if (this.userId) {
      this.docRef = doc(this.firestore, 'users', this.userId);
      const docSnap = await getDoc(this.docRef);
      if (docSnap.exists()) {
        this.user = docSnap.data() as User;
        console.log('User data:', this.user);
      } else {
        console.log('No such document!');
      }
    } else {
      console.log('Invalid user ID');
    }
  }

  openAddressDialog(){
    
  }
}
