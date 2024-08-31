import { Component, inject } from '@angular/core';
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
import { UsuarioStore } from '../../../../core/store/idk/user.store';
import { User } from '../../../../core/store/models/usuario.models';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';

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

    PointsPipe,
    DueDatePipe,
    MatCheckboxModule,
    MatDatepickerModule,

    CommonModule,

  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './top-search-bar.component.html',
  styleUrl: './top-search-bar.component.css'
})
export class TopSearchBarComponent {
  searchText = new FormControl(null);
  taskStore = inject(TaskListStore);
  usersStore = inject(UsuarioStore);

  onNameChange() {
    this.taskStore.setNameFilter(this.searchText.value ?? "");

    this.taskStore.loadAllTasks();
  }

  setStatus(status: string
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
    console.log(event);

    this.taskStore.setDueDateFilter(event.value);
    this.taskStore.loadAllTasks();
  }

  changeTagsCheck(tag: { name: Tag, checked: boolean }) {
    // add a promise with timeout to simulate a request
    this.taskStore.setTagsFilter(tag);
    this.taskStore.loadAllTasks();
  }


}
