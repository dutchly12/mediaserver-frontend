export const formatDate = (date: string) => {
  const receivedDate = new Date(date);

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(receivedDate);
};

export const numberToTime = (value: number) => {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const seconds = Math.floor(value % 60);

  return [hours || undefined, minutes, seconds]
    .filter((item) => typeof item !== 'undefined')
    .map((item) => String(item).padStart(2, '0'))
    .join(':');
};

export const formattedSize = (value: number) => {
  switch (true) {
    case !!Math.floor(value / 10 ** 9):
      return `${(value / 10 ** 9).toFixed(2)}GB`;
    case !!Math.floor((value % 10 ** 9) / 10 ** 6):
      return `${((value % 10 ** 9) / 10 ** 6).toFixed(2)}MB`;
    case !!Math.floor((value % 10 ** 6) / 10 ** 3):
      return `${((value % 10 ** 6) / 10 ** 3).toFixed(2)}KB`;
    default:
      return `${String(value).padEnd(4, '0')}B`;
  }
};

export const formatRelativeTime = (value: string, locale: string) => {
  const date = new Date(value);
  const now = new Date();
  const diff = (+date - +now) / 1000;

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  const divisions: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
    { amount: 60, unit: 'second' },
    { amount: 60, unit: 'minute' },
    { amount: 24, unit: 'hour' },
    { amount: 30, unit: 'day' },
    { amount: 12, unit: 'month' },
    { amount: Infinity, unit: 'year' },
  ];

  let duration = diff;
  for (const division of divisions) {
    if (Math.abs(duration) < division.amount) {
      return rtf.format(Math.round(duration), division.unit);
    }
    duration /= division.amount;
  }
};
