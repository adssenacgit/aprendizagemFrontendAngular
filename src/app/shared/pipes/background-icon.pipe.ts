import { Encontro } from './../../models/Encontro';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'backgroundIcon',
})
export class BackgroundIconPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return '#3f51b5';
      case 2:
        return '#00000026';
    }
    return '#00000026';
  }
}
