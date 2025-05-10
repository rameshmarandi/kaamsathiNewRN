// utils/dateFormatter.js

const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const LONG_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'November', 'December'];

// formatDate('2025-08-03', 'D MMM YYYY');       // { formatted: '3 Aug 2025', isValid: true }
// formatDate('03/08/2025', 'DD-MM-YYYY');       // { formatted: '03-08-2025', isValid: true }
// formatDate('03-08-2025', 'MMMM D, YYYY');     // { formatted: 'August 3, 2025', isValid: true }
// formatDate(1725312000000, 'YYYY/MM/DD');      // { formatted: '2024/09/03', isValid: true }
// formatDate('invalid-date', 'DD-MM-YYYY');     // { formatted: today's date, isValid: false }



const parseFlexibleDate = (input) => {
  if (!input) return { isValid: false, date: new Date() };

  let parsed = new Date(input);

  // Try common manual parsing if default fails
  if (isNaN(parsed.getTime()) && typeof input === 'string') {
    // Support for DD/MM/YYYY or DD-MM-YYYY
    const match = input.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
    if (match) {
      const [_, dd, mm, yyyy] = match;
      parsed = new Date(`${yyyy}-${mm}-${dd}`);
    }
  }

  return {
    isValid: !isNaN(parsed.getTime()),
    date: isNaN(parsed.getTime()) ? new Date() : parsed,
  };
};

/**
 * Format a date into a custom string format.
 * Supported tokens: D, DD, MM, MMM, MMMM, YY, YYYY
 */
export const formatDate = (input, format = 'DD-MM-YYYY') => {
  const { isValid, date } = parseFlexibleDate(input);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const tokenMap = {
    D: day,
    DD: String(day).padStart(2, '0'),
    MM: String(month + 1).padStart(2, '0'),
    MMM: SHORT_MONTHS[month],
    MMMM: LONG_MONTHS[month],
    YY: String(year).slice(-2),
    YYYY: year,
  };

  const formatted = format.replace(/DD|D|MMMM|MMM|MM|YY|YYYY/g, (token) => tokenMap[token]);

  return {
    isValid,
    formatted,
    originalDate: date,
  };
};
