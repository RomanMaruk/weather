import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getIcon',
  standalone: true,
})
export class GetIconPipe implements PipeTransform {
  transform(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
