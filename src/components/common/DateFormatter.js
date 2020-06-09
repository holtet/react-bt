import { format } from 'date-fns';
import { locale } from 'date-fns/locale/nb/index.js';

export function longDateTime(input) {
  if (input == undefined) return '---';
  let date = undefined;
  if (typeof input === 'string') date = new Date(input);
  else date = input;
  return format(date, 'HH:mm EEE dd.MM.yyyy', {
    locale: locale,
  });
}

export function shortDateTime(input) {
  if (input == undefined) return '---';
  let date = undefined;
  if (typeof input === 'string') date = new Date(input);
  else date = input;
  return format(date, 'HH:mm dd.MM.yyyy', {
    locale: locale,
  });
}

export function date(input) {
  if (input == undefined) return '---';
  let date = undefined;
  if (typeof input === 'string') date = new Date(input);
  else date = input;
  return format(date, 'dd.MM.yyyy', {
    locale: locale,
  });
}
