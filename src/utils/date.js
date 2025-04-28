/**
 * Format a date object according to the specified format
 * @param {Date} date - The date to format
 * @param {string} format - Simple format string
 * @returns {string} Formatted date string
 */
export function formatDate(date, format = 'yyyy-MM-dd') {
  const d = new Date(date);
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Add leading zero
  const pad = (num) => String(num).padStart(2, '0');
  
  // Format mapping
  const formats = {
    'd': d.getDate(),
    'dd': pad(d.getDate()),
    'EEE': days[d.getDay()],
    'EEEE': days[d.getDay()],
    'M': d.getMonth() + 1,
    'MM': pad(d.getMonth() + 1),
    'MMM': months[d.getMonth()],
    'yyyy': d.getFullYear(),
    'yy': d.getFullYear().toString().slice(-2),
  };
  
  return format.replace(/yyyy|yy|EEEE|EEE|MM|M|dd|d/g, match => formats[match]);
}

/**
 * Get an array of dates for a given week
 * @param {Date} date - Any date within the week
 * @param {number} startDay - Day of week to start from (0 = Sunday)
 * @returns {Date[]} Array of dates for the week
 */
export function getWeekDates(date = new Date(), startDay = 0) {
  const result = [];
  const d = new Date(date);
  const day = d.getDay();
  
  // Calculate the difference to the start of the week
  const diff = day - startDay;
  const adjustedDiff = diff < 0 ? diff + 7 : diff;
  
  // Set to the start of the week
  d.setDate(d.getDate() - adjustedDiff);
  
  // Generate dates for the week
  for (let i = 0; i < 7; i++) {
    const newDate = new Date(d);
    result.push(newDate);
    d.setDate(d.getDate() + 1);
  }
  
  return result;
}

/**
 * Check if a date is today
 * @param {Date} date - The date to check
 * @returns {boolean} True if the date is today
 */
export function isToday(date) {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

/**
 * Add days to a date
 * @param {Date} date - The base date
 * @param {number} days - Number of days to add
 * @returns {Date} New date with days added
 */
export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
} 