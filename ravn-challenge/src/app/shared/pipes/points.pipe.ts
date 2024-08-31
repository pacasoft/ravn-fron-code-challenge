import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'points',
  standalone: true
})
export class PointsPipe implements PipeTransform {

  transform(pointEstimate: string, ...args: unknown[]): string {
    if (pointEstimate === 'ZERO')
      return '0 points';
    if (pointEstimate === 'ONE')
      return '1 points';
    if (pointEstimate === 'TWO')
      return '2 points';
    if (pointEstimate === 'FOUR')
      return '4 points';
    if (pointEstimate === 'EIGHT')
      return '8 points';

    return 'Estimate';
  }

}
