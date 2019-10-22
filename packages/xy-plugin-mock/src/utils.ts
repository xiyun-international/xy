/**
 * Convert Windows backslash paths to slash paths
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

// clean require cache 包含整个 src 目录
export function cleanRequireCache(paths) {
  Object.keys(require.cache).forEach(file => {
    if (
      paths.some(path => {
        return windowPath(file).indexOf(path) > -1;
      })
    ) {
      delete require.cache[file];
    }
  });
}
