import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-task-card-skeleton',
  standalone: true,
  imports: [
    NgxSkeletonLoaderModule,
    MatIconModule,
    MatCardModule,

  ],
  templateUrl: './task-card-skeleton.component.html',
  styleUrl: './task-card-skeleton.component.css'
})
export class TaskCardSkeletonComponent {

}
