import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Task } from '../../../../core/store/models/tasks.model';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { TagComponent } from '../../../../shared/components/tag/tag.component';
import { DueDatePipe } from '../../../../shared/pipes/due-date.pipe';
import { PointsPipe } from '../../../../shared/pipes/points.pipe';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [
    // CdkTableModule,
    MatTableModule,

    MatIconModule,
    CommonModule,
    AvatarComponent,
    TagComponent,

    DueDatePipe,
    PointsPipe,
  ],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.css'
})
export class TableViewComponent {
  taskList = input<Task[]>([]);

  displayedColumns = [
    'name',
    'tags',
    'pointEstimate',
    'user',
    'dueDateText',
  ];

}
