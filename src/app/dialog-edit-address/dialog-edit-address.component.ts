import { Component, inject } from '@angular/core';
import { User } from '../../models/user.class';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserDetailComponent } from '../user-detail/user-detail.component';


@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatDialogModule, MatFormFieldModule, FormsModule, MatProgressBarModule],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  dialogRef: MatDialogRef<DialogEditAddressComponent> = inject(MatDialogRef);
user!: UserDetailComponent["user"];
loading = false;

closeDialog(){
  this.dialogRef.close();
};
saveUser(){}
}
