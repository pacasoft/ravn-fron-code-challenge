import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main-button',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  templateUrl: './main-button.component.html',
  styleUrl: './main-button.component.css'
})
export class MainButtonComponent {
  text = input("");
  classType = input("");
  icon = input("");

}
