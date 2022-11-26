import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ToFloor' })
export class FloorPipe implements PipeTransform {
  // pipe responsble about transform float numbers to integer
  transform(value: number) {
    return Math.floor(value);
  }
}
