/**
 * Convert Windows backslash paths to slash paths.
 * @param path
 */
export function windowPath(path: string = ''): string {
  if (!path) return;
  const isExtendedLengthPath = /^\\\\\?\\/.test(path);

  if (isExtendedLengthPath) {
    return path;
  }

  return path.replace(/\\/g, '/');
}
