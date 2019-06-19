export function isFunction(fn): boolean {
  return toString.call(fn) === "[object Function]";
}
