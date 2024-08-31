import { PointEstimate, Status, Tag, Task } from './../../../core/store/models/tasks.model';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { TagComponent } from '../tag/tag.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { PointsPipe } from '../../pipes/points.pipe';
import { UserStore } from '../../../core/store/idk/user.store';
import { AvatarComponent } from '../avatar/avatar.component';
import { User } from '../../../core/store/models/usuario.models';
import { MatDatepicker, MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { SecondaryButtonComponent } from '../secondary-button/secondary-button.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MainButtonComponent } from '../main-button/main-button.component';
import { TaskListStore } from '../../../core/store/idk/task.store';
import { FormsModule } from '@angular/forms';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';
import { AppState } from '../../../core/store/idk/app.store';

@Component({
  selector: 'app-edit-task-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,

    TagComponent,
    MatMenuModule,
    MatIconModule,
    PointsPipe,
    TaskStatusPipe,

    AvatarComponent,
    SecondaryButtonComponent,
    MainButtonComponent,

    CommonModule,

    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,

    FormsModule,
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './edit-task-modal.component.html',
  styleUrl: './edit-task-modal.component.css'
})
export class EditTaskModalComponent {
  @ViewChild('picker') picker!: MatDatepicker<Date>;
  readonly dialogRef = inject(MatDialogRef<EditTaskModalComponent>);

  appStore = inject(AppState);

  data = inject<Task>(MAT_DIALOG_DATA);

  taskStore = inject(TaskListStore);

  tagList: { name: Tag, checked: boolean }[] = this.loadData();

  loadData() {
    // mark each tag as checked if found in data.tags
    // console.log(this.data.tags);
    // console.log(this.tagList);
    let tagList = [
      { name: Tag.ANDROID, checked: false },
      { name: Tag.IOS, checked: false },
      { name: Tag.NODE_JS, checked: false },
      { name: Tag.RAILS, checked: false },
      { name: Tag.REACT, checked: false }
    ]

    tagList = tagList.map(tag => {
      return {
        ...tag,
        checked: this.data.tags.includes(tag.name)
      };
    });

    return tagList;

  }

  setStatus(status: string
  ) {
    this.data = {
      ...this.data,
      status: Status[status as keyof typeof Status]
    };
  }

  setName(event: Event) {
    this.data = {
      ...this.data,
      name: (event.target as HTMLInputElement).value
    };
  }

  handleClearData() {
    this.dialogRef.close();
  }

  handleUpdateData() {
    // TODO: add mutation to update task
    this.taskStore.updateTask(this.data);
    this.dialogRef.close();
  }



  usersStore = inject(UserStore);

  setPointEstimate(point: 'ZERO' | 'ONE' | 'TWO' | 'FOUR' | 'EIGHT') {
    this.data = {
      ...this.data,
      pointEstimate: PointEstimate[point as keyof typeof PointEstimate]
    };
  }

  setAssignee(assignee: User) {
    this.data = {
      ...this.data,
      assignee: assignee
    };
  }

  handleSetDueDate(event: MatDatepickerInputEvent<Date>) {
    this.data = {
      ...this.data,
      dueDate: event.value!
    };

  }

  changeTagsCheck(tag: { name: Tag, checked: boolean }) {
    tag.checked = !tag.checked;

    let tagList: Tag[] = this.tagList.filter(tag => tag.checked).map(tag => tag.name);

    this.data = {
      ...this.data,
      tags: tagList
    };
  }

  setTodayDate() {
    this.picker.select(new Date());
    this.picker.close();


  }

}
