export function isArray(v) {
  return Object.prototype.toString.call(v) === "[object Array]";
}

export function isObject(v) {
  return Object.prototype.toString.call(v) === "[Object Object]";
}

export function isFunction(v) {
  return Object.prototype.toString.call(v) === "[object Function]";
}

export function deepCopy(data, type) {
  if (isArray(data) || isObject(data)) {
    switch (type) {
      case "recursive":
        if (isArray(data)) {
          return data.map((item) => {
            return deepCopy(item);
          });
        }
        if (isObject(data)) {
          const newData = {};
          for (let i in data) {
            newData[i] = deepCopy(data[i]);
          }
          return newData;
        }
        break;
      case "json":
      default:
        return JSON.parse(JSON.stringify(data));
    }
  } else if (isFunction(data)) {
    return new Function("return " + String(data))();
  } else {
    return data;
  }
}
