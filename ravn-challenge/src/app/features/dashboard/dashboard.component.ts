import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TopSearchBarComponent } from './components/top-search-bar/top-search-bar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { TaskListStore } from '../../core/store/idk/task.store';
import { DashboardStore } from '../../core/store/idk/dashboard-filters.store';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { UsuarioStore } from '../../core/store/idk/user.store';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskModalComponent } from '../../shared/components/edit-task-modal/edit-task-modal.component';
import { Task } from '../../core/store/models/tasks.model';
import { LayoutComponent } from '../../core/layout/layout.component';
import { AppState } from '../../core/store/idk/app.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatSidenavModule,

    LayoutComponent,

    TopSearchBarComponent,
    SidebarComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,

    GridViewComponent,
    ListViewComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  dashStore = inject(DashboardStore);
  usersStore = inject(UsuarioStore);
  appStore = inject(AppState);

  onChangeView(event: MatButtonToggleChange) {
    this.dashStore.updateTaskView(event.value);
  }



  readonly dialog = inject(MatDialog);
  openEditModal() {
    this.dialog.open(EditTaskModalComponent, {
      data: {
        id: null,
        name: 'Task 1',
        pointEstimate: '',
        creator: this.appStore.profile(),
        dueDate: null,
        position: 1,
        status: 'TODO',
        tags: [],
        createdAt: new Date(),

        assignee: null,
      },
    });
  }


  ngOnInit(): void {

    this.usersStore.loadUsers();

  }
}
