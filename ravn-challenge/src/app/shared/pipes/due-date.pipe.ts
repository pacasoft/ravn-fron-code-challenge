import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dueDate',
  standalone: true
})
export class DueDatePipe implements PipeTransform {

  transform(value: Date | string, ...args: unknown[]): string {
    let date = new Date(value);
    const currentDate = new Date();
    let dueDateText = "";
    if (date > currentDate) {
      // return date like: 6 July, 2020
      dueDateText = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      const [month, day, year] = dueDateText.split(' ');

      dueDateText = `${day.substring(0, day.length - 1)} ${month.toUpperCase()}, ${year}`;

    } else {
      if (date.getDate() === currentDate.getDate()) {
        dueDateText = 'TODAY';
      } else {
        if (date.getDate() === currentDate.getDate() - 1) {
          dueDateText = 'YESTERDAY';
        } else {
          dueDateText = 'OVERDUE';
        }

      }
    }
    return dueDateText;
  }

}
