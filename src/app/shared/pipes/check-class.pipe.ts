import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'checkClass',
})
export class CheckClassPipe implements PipeTransform {
  transform(value: number): string {
    // switch (value) {
    //   case 1:
    //     return 'check';
    //   case 2:
    //     return 'uncheck';
    // }
    return 'check';
  }
}
