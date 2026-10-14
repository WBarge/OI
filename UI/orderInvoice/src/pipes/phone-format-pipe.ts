import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {
 transform(value: string | number | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    // Strip everything that isn't a digit
    let digits = String(value).replace(/\D/g, '');

    // Drop a leading US country code (e.g. 1 or +1)
    if (digits.length === 11 && digits.startsWith('1')) {
      digits = digits.slice(1);
    }

    // Only format complete 10-digit numbers; otherwise return the original input
    if (digits.length !== 10) {
      return String(value);
    }

    const area = digits.slice(0, 3);
    const prefix = digits.slice(3, 6);
    const line = digits.slice(6);

    return `(${area}) ${prefix}-${line}`;
  }
}
