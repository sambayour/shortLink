// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomstring = require('randomstring');

/**
 * simply generates a number of a given length
 * @param length
 */
export const randomStr = (length) => {
  return randomstring.generate(length);
};
