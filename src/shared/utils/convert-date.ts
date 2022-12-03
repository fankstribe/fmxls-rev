export function convertDate(value) {
  const date = new Date(value).toJSON().split('T')[0];

  return date;
}
