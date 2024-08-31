import { Component, inject, OnInit, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DashboardStore } from '../../core/store/idk/dashboard-filters.store';
import { GridViewComponent } from './components/grid-view/grid-view.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { UserStore } from '../../core/store/idk/user.store';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskModalComponent } from '../../shared/components/edit-task-modal/edit-task-modal.component';
import { LayoutComponent } from '../../core/layout/layout.component';
import { AppState } from '../../core/store/idk/app.store';
import { MatTabsModule } from '@angular/material/tabs';
import { MainButtonComponent } from "../../shared/components/main-button/main-button.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatTabsModule,
    LayoutComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    GridViewComponent,
    ListViewComponent,
    MainButtonComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  dashStore = inject(DashboardStore);
  usersStore = inject(UserStore);
  appStore = inject(AppState);

  onChangeView(value: string) {
    this.dashStore.updateTaskView(value);
  }



  readonly dialog = inject(MatDialog);
  openEditModal() {
    let width = this.appStore.smallScreen() ? '100%' : 'auto';
    let height = this.appStore.smallScreen() ? '100%' : 'auto';


    this.dialog.open(EditTaskModalComponent, {
      width: width,
      height: height,
      maxWidth: '100vw',
      maxHeight: '100vh',
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
