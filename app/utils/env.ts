/**
 * Check if the current environment is specifically NOT development or test.
 * We do this to avoid issues where process.env.NODE_ENV is '', for example
 * on the client, and incorrectly thinking process.env.NODE_ENV === 'production'.
 * @returns {boolean}
 */
export function isProduction() {
  return !["development", "test"].includes(process.env.NODE_ENV);
}
