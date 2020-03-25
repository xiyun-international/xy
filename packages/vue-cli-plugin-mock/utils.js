/**
 * Convert Windows backslash paths to slash paths.
 * @param path
 */
module.exports = function windowPath(path) {
  if (!path) return;
  const isExtendedLengthPath = /^\\\\\?\\/.test(path);

  if (isExtendedLengthPath) {
    return path;
  }

  return path.replace(/\\/g, '/');
};
