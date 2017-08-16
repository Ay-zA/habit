Date.tomorrow = function() {
  let tomorrow = new Date(Date.now() + 24 * 3600 * 1000);
  return Math.floor(tomorrow / 1000);
};
