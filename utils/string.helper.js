export const padString = (string, length) => {
  let normalString = string;

  if (typeof normalString !== 'string') {
    normalString = 'xxx';
  }

  return normalString.padEnd(length);
};
