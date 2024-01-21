import dayjs from 'dayjs';

export const formatDate = (date: Date): string => {
  return dayjs(date).format('DD MMM YYYY hh:mm A');
};

export const getTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
};