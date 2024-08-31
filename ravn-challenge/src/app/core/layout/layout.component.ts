import { Component, inject, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../../features/dashboard/components/sidebar/sidebar.component';
import { AppState } from '../store/idk/app.store';
import { TaskListStore } from '../store/idk/task.store';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatSidenavModule,

    SidebarComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  userStore = inject(AppState);
  taskStore = inject(TaskListStore);

  ngOnInit(): void {
    this.taskStore.loadAllTasks();
    this.userStore.loadProfile();

  }

}
