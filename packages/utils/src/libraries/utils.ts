export function isFunction(fn): boolean {
  return toString.call(fn) === "[object Function]";
}

export function isObject(obj): boolean {
  return toString.call(obj) === "[object Object]";
}
