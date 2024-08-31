import { Component, inject } from '@angular/core';
import { TaskListStore } from '../../../../core/store/idk/task.store';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AvatarComponent } from '../../../../shared/components/avatar/avatar.component';
import { TagComponent } from '../../../../shared/components/tag/tag.component';
import { MatMenuModule } from '@angular/material/menu';
import { PointsPipe } from '../../../../shared/pipes/points.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { PointEstimate, Status, Tag } from '../../../../core/store/models/tasks.model';
import { User } from '../../../../core/store/models/usuario.models';
import { UserStore } from '../../../../core/store/idk/user.store';
import { AppState } from '../../../../core/store/idk/app.store';

@Component({
  selector: 'app-search-filter-bar',
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
    MatCheckboxModule,
    MatDatepickerModule,

    CommonModule,

  ],
  templateUrl: './search-filter-bar.component.html',
  styleUrl: './search-filter-bar.component.css'
})
export class SearchFilterBarComponent {
  searchText = new FormControl('');
  taskStore = inject(TaskListStore);
  usersStore = inject(UserStore);
  appState = inject(AppState);


  onNameChange() {
    this.taskStore.setNameFilter(this.searchText.value ?? "");

    this.taskStore.loadAllTasks();
  }

  clearNameFilter() {
    this.searchText.patchValue('');
    this.taskStore.setNameFilter("");

    this.taskStore.loadAllTasks();
  }

  setStatus(status: string | null
  ) {
    this.taskStore.setStatusFilter(
      Status[status as keyof typeof Status]
    );
    this.taskStore.loadAllTasks();
  }

  setPointEstimate(pointEstimate: string | null) {
    this.taskStore.setPointEstimateFilter(
      PointEstimate[pointEstimate as keyof typeof PointEstimate]
    );
    this.taskStore.loadAllTasks();
  }


  setAssignee(assignee: User | null) {
    this.taskStore.setAssigneeFilter(assignee);
    this.taskStore.loadAllTasks();
  }

  setOwner(user: User | null) {
    this.taskStore.setOwnerFilter(user);
    this.taskStore.loadAllTasks();
  }

  handleSetDueDate(event: MatDatepickerInputEvent<Date>) {
    this.taskStore.setDueDateFilter(event.value);
    this.taskStore.loadAllTasks();
  }

  changeTagsCheck(tag: { name: Tag, checked: boolean }) {
    // add a promise with timeout to simulate a request
    this.taskStore.setTagsFilter(tag);
    this.taskStore.loadAllTasks();
  }

}
