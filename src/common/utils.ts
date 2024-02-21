import { compare, hashSync } from 'bcrypt';

/**
 * generate hash from password or string
 * @param {string} password
 * @returns {string}
 */
export function generateHash(password: string): string {
  return hashSync(password, 10);
}

/**
 * validate text with hash
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export function validateHash(
  password: string | undefined,
  hash: string | undefined | null,
): Promise<boolean> {
  if (!password || !hash) {
    return Promise.resolve(false);
  }

  return compare(password, hash);
}

export function getInitials(sentence: string) {
  // Split the sentence into words
  const words = sentence.split(' ');

  // Map each word to its initials
  const initials = words.map((word) => word.charAt(0));

  // Join the initials to form the result
  return initials.join('').toUpperCase();
}
