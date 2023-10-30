import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true
})
export class PricePipe implements PipeTransform {

  transform(value: number): string {
    const fixed = value ? (Math.floor(value * 100) / 100).toFixed(2) : '0.00';
    return fixed.replaceAll(".", ",");
  }

}
