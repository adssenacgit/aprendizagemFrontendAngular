import { Pipe, PipeTransform } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

@Pipe({
  name: 'icon',
})
export class IconPipe implements PipeTransform {
  transform(value: number): PrimeIcons {
    switch (value) {
      case 1:
        return PrimeIcons.CHECK;
      case 2:
        return PrimeIcons.CLOCK;
    }
    return PrimeIcons.CLOCK;
  }
}
