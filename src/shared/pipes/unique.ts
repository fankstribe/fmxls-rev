import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique',
})
export class UniquePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    // Remove the duplicate elements
    const uniqueArray = value.filter((el, index, array) => {
      return array.indexOf(el) === index;
    });

    return uniqueArray;
  }
}
