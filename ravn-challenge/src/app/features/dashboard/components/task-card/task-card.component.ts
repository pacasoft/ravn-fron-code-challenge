import { Component, computed, inject, input, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { initialTask, Task } from '../../../../core/store/models/tasks.model';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TagComponent } from '../../../../shared/components/tag/tag.component';
import { PointsPipe } from '../../../../shared/pipes/points.pipe';
import { DueDatePipe } from '../../../../shared/pipes/due-date.pipe';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskModalComponent } from '../../../../shared/components/edit-task-modal/edit-task-modal.component';
import { CommonModule } from '@angular/common';
import { TaskListStore } from '../../../../core/store/idk/task.store';
import { DeleteTaskModalComponent } from '../../../../shared/components/delete-task-modal/delete-task-modal.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AppState } from '../../../../core/store/idk/app.store';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    TagComponent,
    AvatarComponent,
    PointsPipe,
    DueDatePipe,
    CommonModule,
    EditTaskModalComponent,
    NgxSkeletonLoaderModule,

  ],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css'
})
export class TaskCardComponent {
  taskData = input<Task>(initialTask);

  appStore = inject(AppState);


  statusDueDate = computed(() => {
    let date = new Date(this.taskData().dueDate);

    if (date) {
      if (date < new Date()) {
        return 'danger-tag';
      }
      if (new Date().getDate() - date.getDate() <= 2) {
        return 'warning-tag';
      }
      return 'white-tag';
    }
    return 'white-tag';
  });


  readonly dialog = inject(MatDialog);
  openEditModal() {
    let width = this.appStore.smallScreen() ? '100%' : 'auto';
    let height = this.appStore.smallScreen() ? '100%' : 'auto';

    this.dialog.open(EditTaskModalComponent, {
      data: this.taskData(),
      width: width,
      height: height,
      maxWidth: '100vw',
      maxHeight: '100vh',
    });
  }

  deleteTask() {
    this.dialog.open(DeleteTaskModalComponent, {
      data: this.taskData().id,
      width: '400px',

    });
  }



}
