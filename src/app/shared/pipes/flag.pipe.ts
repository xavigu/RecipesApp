import { Pipe, PipeTransform } from '@angular/core';

const COUNTRIES = {
  EN: 'GB',
  ES: 'ES',
  FR: 'FR',
};

@Pipe({ name: 'flag' })
export class FlagPipe implements PipeTransform {
  transform(country: string): string {
    const codePoints = COUNTRIES[country.toUpperCase()].replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt())
    );
    return codePoints;
  }
}
