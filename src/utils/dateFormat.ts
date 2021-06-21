import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const toLocalDateFormat = (date: string): string => {
  if (date === '' || date === undefined) return '';

  const dateObj = new Date(date);
  return format(new Date(dateObj.valueOf() + dateObj.getTimezoneOffset() * 60 * 1000), 'dd/MM/yyyy', { locale: ptBR });
};

export const toISODateFormat = (date: string): string => {
  if (date === '' || date === undefined) return '';

  var dateParts = date.split("/");

  return format(new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]), 'yyyy-MM-dd');
}