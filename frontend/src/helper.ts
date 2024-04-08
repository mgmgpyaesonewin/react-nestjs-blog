import day from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export function humanizeDate(date: string): string {
  day.extend(relativeTime);
  return day(date).fromNow();
}
