import { Component, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {
  tagIcon = input("");
  tagName = input("");
  classType = input("");

}
