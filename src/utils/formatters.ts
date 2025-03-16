export const numberToTime = (value: number) => {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value % 3600) / 60);
  const seconds = Math.floor(value % 60);

  return [hours || undefined, minutes, seconds]
    .filter((item) => typeof item !== 'undefined')
    .map((item) => String(item).padStart(2, '0'))
    .join(':');
};
