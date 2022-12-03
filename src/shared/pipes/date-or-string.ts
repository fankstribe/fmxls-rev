import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

export const isDate = (date: string) => {
  return !!Date.parse(date);
};

@Pipe({
  name: 'dateOrString',
})
export class DateOrStringPipe extends DatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) locale: string) {
    super(locale);
  }

  transform(
    value: any,
    format?: string,
    timezone?: string,
    locale?: string
  ): any {
    return isDate(value)
      ? super.transform(value, format, timezone, locale)
      : value;
  }
}
