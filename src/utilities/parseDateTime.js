const dateOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'UTC',
};

const parseDate = createdAt => {
  const date = new Date(createdAt);
  const formatter = new Intl.DateTimeFormat('en-US', dateOptions);

  const parts = formatter.formatToParts(date);

  const result = parts
    .filter(({ type }) => Object.keys(dateOptions).includes(type))
    .reduce(
      (result, { type, value }) => ({...result, [type]: value }),
      {}
    );

  return result;
};

export default parseDate;
