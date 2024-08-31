import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { TaskListStore } from '../../../../core/store/idk/task.store';
import { TagComponent } from '../../../../shared/components/tag/tag.component';
import { MatMenuModule } from '@angular/material/menu';
import { PointEstimate, Status, Tag } from '../../../../core/store/models/tasks.model';
import { PointsPipe } from '../../../../shared/pipes/points.pipe';
import { DueDatePipe } from '../../../../shared/pipes/due-date.pipe';
import { UserStore } from '../../../../core/store/idk/user.store';
import { User } from '../../../../core/store/models/usuario.models';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AppState } from '../../../../core/store/idk/app.store';
import { MatDialog } from '@angular/material/dialog';
import { SearchModalComponent } from '../search-modal/search-modal.component';
import { SearchFilterBarComponent } from '../search-filter-bar/search-filter-bar.component';
import { MatBadgeModule } from '@angular/material/badge';
import { SidenavService } from '../../../../core/services/sidenav.service';

@Component({
  selector: 'app-top-search-bar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    AvatarComponent,

    TagComponent,
    MatMenuModule,
    SearchFilterBarComponent,

    PointsPipe,
    DueDatePipe,
    MatCheckboxModule,
    MatDatepickerModule,
    MatBadgeModule,
    CommonModule,

  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './top-search-bar.component.html',
  styleUrl: './top-search-bar.component.css'
})
export class TopSearchBarComponent {
  searchText = new FormControl('');
  taskStore = inject(TaskListStore);
  usersStore = inject(UserStore);
  appStore = inject(AppState);

  readonly dialog = inject(MatDialog);
  openSearchModal() {
    this.dialog.open(SearchModalComponent, {
      width: '100%',
      height: '100%',
      maxWidth: '100vw',
      maxHeight: '100vh',
    });

  }

  @ViewChild('sidebar') sidebar: any;
  openSidebar() {
    this.sideNavService.toggle();

  }

  onNameChange() {
    this.taskStore.setNameFilter(this.searchText.value ?? "");

    this.taskStore.loadAllTasks();
  }

  clearNameFilter() {
    this.searchText.patchValue('');
    this.taskStore.setNameFilter("");

    this.taskStore.loadAllTasks();
  }

  constructor(private sideNavService: SidenavService) { }

}
