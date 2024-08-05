import { Component, inject } from '@angular/core';
import { User } from '../../models/user.class';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { doc, Firestore, updateDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent {
  dialogRef: MatDialogRef<DialogEditUserComponent> = inject(MatDialogRef);
  user!: UserDetailComponent['user'];
  loading = false;
  userId: string | undefined;
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);

  closeDialog(){
    this.dialogRef.close();
  };
  async saveUser() {
    this.loading = true;
      if (this.userId) {
        const userRef = doc(this.firestore, 'users', this.userId);
        await updateDoc(userRef, this.user.toJSON()).then(() => {
          this.loading = false;
        this.dialogRef.close();
        });

      } else {
        throw new Error('User ID ist nicht definiert');
      }
    }
  }







