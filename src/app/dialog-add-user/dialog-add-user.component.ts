import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { collection, Firestore } from '@angular/fire/firestore';
import { doc, setDoc } from "firebase/firestore";
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,

  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore);
  dialogRef: MatDialogRef<DialogAddUserComponent> = inject(MatDialogRef);
  user = new User();
  birthDate!: Date;
  loading = false;

 async saveUser(){
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is', this.user);
   this.loading = true;
   const newUserRef = doc(collection(this.firestore, "users"))
   try {
    await setDoc(newUserRef, this.user.toJSON());
    console.log('Adding user complete');
    this.loading = false;
    this.dialogRef.close();
  } catch (error) {
    console.error('Error adding user: ', error);
    this.loading = false;
  }
}

closeDialog() {
  this.dialogRef.close();
}
}
