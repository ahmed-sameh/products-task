import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cutLongString' })
export class CutStringsPipe implements PipeTransform {
  // pipe responsable about short the strings based on length that pass to it

  transform(value: string, maxLength: number) {
    if (value.length > maxLength) {
      return `${value.substring(0, maxLength)}...`;
    } else {
      return value;
    }
  }
}
