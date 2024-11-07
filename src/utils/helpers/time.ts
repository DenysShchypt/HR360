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
