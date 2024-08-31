import { Component, inject, signal } from '@angular/core';
import { TaskListStore } from '../../../../core/store/idk/task.store';
import { TableViewComponent } from '../table-view/table-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatIconModule,

    CommonModule,
    MatTableModule,

    TableViewComponent,
  ],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.css'
})
export class ListViewComponent {
  expCANCELLED = signal(true);
  expBACKLOG = signal(true);
  expTODO = signal(true);
  expPROGRESS = signal(true);
  expDONE = signal(true);

  taskStore = inject(TaskListStore);

  displayedColumns = [
    'name',
    'tags',
    'pointEstimate',
    'user',
    'dueDateText',
  ];

}
