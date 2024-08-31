import { Component, inject, input } from '@angular/core';
import { TaskColumnComponent } from '../task-column/task-column.component';
import { TaskListStore } from '../../../../core/store/idk/task.store';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Status, Task } from '../../../../core/store/models/tasks.model';

@Component({
  selector: 'app-grid-view',
  standalone: true,
  imports: [
    TaskColumnComponent,
    CdkDropListGroup,
    CdkDropList,
  ],
  templateUrl: './grid-view.component.html',
  styleUrl: './grid-view.component.css'
})
export class GridViewComponent {
  taskStore = inject(TaskListStore);

  drop(event: CdkDragDrop<any>) {

    if (event.previousContainer === event.container) {

      // check if not being moved
      if (event.previousIndex === event.currentIndex) return;


      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateTasksPosition(event.container.data);
    } else {
      let status = event.container.element.nativeElement.getAttribute('status');
      let id = event.item.element.nativeElement.getAttribute('id');
      if (!id || !status) return;

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.updateTasksPosition(event.container.data, id, status);
    }
  }

  updateTasksPosition(tasks: Task[], id: string = "", status: string = "") {
    for (let i = 0; i < tasks.length; ++i) {
      tasks[i] = {
        ...tasks[i],
        position: i + 1,
      }
      if (id === tasks[i].id) {
        tasks[i] = {
          ...tasks[i],
          status: Status[status as keyof typeof Status],
        }
      }
    }

    for (let i = 0; i < tasks.length; ++i) {
      this.taskStore.updateTask(tasks[i]);
    }
    // if (id) {
    //   let task = this.taskStore.getTask(id);
    //   if (!task) return;
    //   task.status = Status[status as keyof typeof Status];

    // } else {

    // }
  }
}
