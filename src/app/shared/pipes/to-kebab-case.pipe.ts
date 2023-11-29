import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'dsToKebabCase',
  standalone: true,
})
export class ToKebabCasePipe implements PipeTransform {

  transform(value: string,): string {
    return value.replaceAll(" ", "-");
  }

}
