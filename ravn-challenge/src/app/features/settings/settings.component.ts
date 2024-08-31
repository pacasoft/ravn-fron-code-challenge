import { Component, inject } from '@angular/core';
import { AppComponent } from '../../app.component';
import { LayoutComponent } from "../../core/layout/layout.component";
import { MatCardModule } from '@angular/material/card';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AppState } from '../../core/store/idk/app.store';
import { MatIconModule } from '@angular/material/icon';
import { AvatarComponent } from '../../shared/components/avatar/avatar.component';
import { TaskListStore } from '../../core/store/idk/task.store';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../../shared/components/tag/tag.component';
import { Task } from '../../core/store/models/tasks.model';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    AppComponent,
    LayoutComponent,
    MatCardModule,
    NgxSkeletonLoaderModule,
    MatIconModule,
    AvatarComponent,

    TagComponent,
    CommonModule,

  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  appState = inject(AppState);

  statusDueDate(task: Task) {
    let date = new Date(task.dueDate);

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
  }

}
