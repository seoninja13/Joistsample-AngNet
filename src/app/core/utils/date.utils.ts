import { format, parseISO } from 'date-fns';

export class DateUtils {
  static formatDate(date: string | Date, formatStr: string = 'MM/dd/yyyy'): string {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return format(parsedDate, formatStr);
  }

  static isValidDate(date: string | Date): boolean {
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return !isNaN(parsedDate.getTime());
  }
}