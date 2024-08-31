import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { SecondaryButtonComponent } from '../secondary-button/secondary-button.component';
import { MainButtonComponent } from '../main-button/main-button.component';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';
import { TaskListStore } from '../../../core/store/idk/task.store';

@Component({
  selector: 'app-delete-task-modal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,

    SecondaryButtonComponent,
    MainButtonComponent
  ],
  templateUrl: './delete-task-modal.component.html',
  styleUrl: './delete-task-modal.component.css'
})
export class DeleteTaskModalComponent {
  data = inject<string>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<EditTaskModalComponent>);

  taskStore = inject(TaskListStore);

  handleCancel() {
    this.dialogRef.close();
  }

  handleDeleteTask() {
    this.taskStore.deleteTask(this.data);
    this.dialogRef.close();
  }


}
