import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent {
  imgSrc = input('assets/images/avatar.jpg');
  size = input(40);
  fallbackSrc: string = 'assets/images/avatar.jpg'; // Set your fallback image path here


  onImgError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = this.fallbackSrc;
  }

}
