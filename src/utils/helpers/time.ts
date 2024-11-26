const now = new Date();

export const datePart = `${now.getDate()} ${now.toLocaleString('en-US', {
  month: 'long',
})}, ${now.getFullYear()}`;
export const datePartShort = `${now.getDate()} ${now.toLocaleString('en-US', {
  month: 'short',
})}, ${now.getFullYear()}`;

export const timePart = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

export const dateDayMonth: string = now.toLocaleDateString('en-GB', {
  day: '2-digit',
  month: '2-digit',
});

export const getRandomTime = () => {
  const hours = Math.floor(Math.random() * 12) + 1;
  const minutes = Math.floor(Math.random() * 60);
  const period = Math.random() < 0.5 ? 'AM' : 'PM';
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${hours}:${formattedMinutes} ${period}`;
};

export const formatEventDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};
