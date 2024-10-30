const now = new Date();

export const datePart = `${now.getDate()} ${now.toLocaleString('en-US', {
  month: 'long',
})}, ${now.getFullYear()}`;
export const timePart = now.toLocaleTimeString('en-US', {
  hour: 'numeric',
  minute: 'numeric',
  hour12: true,
});
