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
