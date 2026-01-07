/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const pathArr = path.split(".");

  if (pathArr.length === 0) {
    return function (obj) {
      return obj;
    };
  }

  return function (obj) {
    return pathArr.reduce(
      (currentValue, currentKey) =>
        currentValue && currentValue.hasOwnProperty(currentKey)
          ? currentValue[currentKey]
          : undefined,
      obj
    );
  };
}
