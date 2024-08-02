import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userId: string | null = null;

  constructor(private route:ActivatedRoute){

  }

  ngOnInit(): void {
      this.route.paramMap.subscribe( paramMap => {
        this.userId = paramMap.get('id');
        console.log('user id ist', this.userId)
    })

  }
}
