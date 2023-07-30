const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DateParser = createdAt => {
  const date = new Date(createdAt);
  const day = date.getDate(); // Возвращает день месяца от 1 до 31
  const month = monthNames[date.getMonth()];
  const year = date.getUTCFullYear(); // Возвращает год (4 цифры)
  const hours = date.getUTCHours(); // Возвращает часы в UTC (от 0 до 23)
  const minutes = date.getUTCMinutes().toString().padStart(2, '0'); // Возвращает минуты в UTC (от 0 до 59), добавляет ведущий ноль при необходимости
  return { day, month, year, hours, minutes };
};

export default DateParser;
