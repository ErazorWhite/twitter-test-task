
let formatterInstance;
const dateOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: 'UTC',
};

function getFormatter() {
  if (!formatterInstance) {
    formatterInstance = new Intl.DateTimeFormat('en-US', dateOptions);
  }
  return formatterInstance;
}


export const parseDateTime = createdAt => {
  const date = new Date(createdAt);
  const parts = getFormatter().formatToParts(date);
  const result = parts.reduce((result, { type, value }) => ({ ...result, [type]: value }), {});

  return result;
};
