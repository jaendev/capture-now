import { MARKDOWN_CHARS } from "@/constants/markdown"

/**
 * Remove specified characters from a string
 * @param text - String to clean
 * @param charsToRemove - Array of characters to remove
 * @param escapeRegex - Whether to escape regex special characters (default: true)
 * @returns Cleaned string
 * 
 * @example
 * removeChars("# Hello *World*", ['#', '*']) // "Hello World"
 * removeChars("(test) [more]", ['(', ')', '[', ']']) // "test more"
 */
export function removeChars(
  text: string,
  charsToRemove: string[],
  escapeRegex: boolean = true
): string {
  if (charsToRemove.length === 0) return text

  let chars = charsToRemove

  if (escapeRegex) {
    // Escape regex special characters
    chars = charsToRemove.map(char =>
      char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    )
  }

  const regex = new RegExp(`[${chars.join('')}]`, 'g')
  return text.replace(regex, '')
}

/**
 * Strip markdown formatting from text
 * @param text - Markdown text
 * @returns Plain text without markdown syntax
 * 
 * @example
 * stripMarkdown("# Hello **World**") // "Hello World"
 */
export function stripMarkdown(text: string): string {
  return removeChars(text, [...MARKDOWN_CHARS])
}

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to add when truncated (default: "...")
 * @returns Truncated text
 * 
 * @example
 * truncate("Hello World", 8) // "Hello..."
 */
export function truncate(text: string, maxLength: number, suffix: string = '...'): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - suffix.length) + suffix
}

/**
 * Convert string to slug format
 * @param text - Text to convert
 * @returns Slug string
 * 
 * @example
 * slugify("Hello World!") // "hello-world"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Get the first line of text after removing specified characters
 * @param text - Input text
 * @param charsToRemove - Characters to remove
 * @returns First line of cleaned text
 * 
 * @example
 * getFirstLine("# Hello World\nThis is a test.", ['#']) // "Hello World"
 */
export function getFirstLine(text: string, charsToRemove: string[],): string {
  const cleanText = removeChars(text, charsToRemove)

  const lines = cleanText.split('\n')
  return lines.length > 0 ? lines[0] : text
}