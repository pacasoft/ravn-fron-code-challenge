import { Component, inject, input } from '@angular/core';
import { Task } from '../../../../core/store/models/tasks.model';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskCardSkeletonComponent } from '../task-card-skeleton/task-card-skeleton.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskListStore } from '../../../../core/store/idk/task.store';

@Component({
  selector: 'app-task-column',
  standalone: true,
  imports: [
    TaskCardComponent,
    TaskCardSkeletonComponent,
    MatIconModule,
    MatCardModule,

    CdkDrag,
  ],
  templateUrl: './task-column.component.html',
  styleUrl: './task-column.component.css'
})
export class TaskColumnComponent {
  taskList = input<Task[]>([]);
  loading = input(true);
  title = input("");
  cant = input(0);



}
