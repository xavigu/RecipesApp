import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appCreditcard]',
})
export class CreditCardDirective {
  @HostBinding('style.border')
  border: string;

  // We need to send the event we want to listen (keydown) and the host is the element where we use this directive
  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // catch the input element into a variable
    const input = event.target as HTMLInputElement;
    // replace espacio por empty string
    let trimmed = input.value.replace(/\s+/g, '');
    if (trimmed.length > 16) {
      trimmed = trimmed.substring(0, 16);
    }

    const numbers = [];
    // recorre el string de 4 en 4 añadiendo un espacio al final
    for (let i = 0; i < trimmed.length; i += 4) {
      numbers.push(trimmed.substring(i, 4));
    }
    input.value = numbers.join(' ');

    this.border = '';
    // check if only contain numbers
    if (/[^\d]+/.test(trimmed)) {
      this.border = '1px solid red';
    }
  }
}
