
/**
 * Returns the time portion of a given date as a localized string.
 *
 * @param date - The `Date` object to extract the time from.
 * @param location - An optional locale string or array of locale strings 
 *                   to specify the formatting locale. Defaults to the runtime's default locale.
 * @returns A string representing the time in the format "HH:mm" based on the specified or default locale.
 */
export function getTime(date: Date, location = undefined) {
  return new Date(date).toLocaleTimeString(location, {
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Formats a given date into a localized date string.
 *
 * @param date - The `Date` object to be formatted.
 * @param location - An optional locale string (e.g., 'en-US', 'fr-FR') to specify the language and region for formatting.
 *                   If not provided, the default locale of the runtime environment will be used.
 * @returns A string representing the formatted date, including the weekday, year, month, and day.
 *
 * @example
 * const date = new Date('2023-10-05');
 * console.log(getDate(date, 'en-US')); // Output: "Thursday, October 5, 2023"
 * console.log(getDate(date, 'fr-FR')); // Output: "jeudi 5 octobre 2023"
 */
export function getDate(date: Date, location = undefined) {
  return new Date(date).toLocaleDateString(location, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}