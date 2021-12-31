function PrativeClass() {
  this.__store__ = this.get("__store__") || {};

  const __this = this;
  class Storage {
    constructor() {}

    get storeState() {
      return JSON.parse(JSON.stringify(__this.__store__));
    }

    get(key, async = false) {
      if (__this.__store__[key]) {
        return __this.get(key, async);
      } else {
        if (async) {
          return new Promise((reslove, reject) => {
            reslove(null);
          });
        } else {
          return null;
        }
      }
    }

    getDatas(fliters) {
      const data = {};
      for (let i in fliters) {
        for (let j in __this.__store__) {
          if (__this.__store__[j][i] == filters[i]) {
            data[j] = this.get(j);
          }
        }
      }
      return data;
    }

    set(key, value, force = true, async = false) {
      if (key == "__store__") {
        throw new Error("__store__ is a default key, please use another key");
      }
      if (!force && __this.__store__[key]) {
        throw new Error(`Key "${key}" has been used`);
      }
      __this.__store__[key] = {
        type: typeof value,
        force,
      };
      __this.set("__store__", __this.__store__);
      return __this.set(key, value, async);
    }

    remove(key, async = false) {
      if (__this.__store__[key]) {
        delete __this.__store__[key];
        __this.set("__store__", __this.__store__);
        return __this.remove(key, async);
      } else {
        if (async) {
          return new Promise((reslove, reject) => {
            reject(`There is no key "${key}"`);
          });
        }
      }
    }

    has(key) {
      return !!__this.__store__[key];
    }
  }
  this.public = new Storage();
  return this.public;
}

PrativeClass.prototype.set = function (key, value, async) {
  if (async) {
    return new Promise((reslove, reject) => {
      uni.setStorage({
        key,
        data: value,
        success: (res) => {
          reslove(res);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  } else {
    uni.setStorageSync(key, value);
  }
};

PrativeClass.prototype.get = function (key, async) {
  if (async) {
    return new Promise((reslove, reject) => {
      uni.getStorageSync({
        key,
        success: (res) => {
          reslove(res);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  } else {
    return uni.getStorageSync(key);
  }
};

PrativeClass.prototype.remove = function (key, async) {
  if (async) {
    return new Promise((reslove, reject) => {
      uni.removeStorageSync({
        key,
        success: (res) => {
          reslove(res);
        },
        fail: (err) => {
          reject(err);
        },
      });
    });
  } else {
    uni.removeStorageSync(key);
  }
};

export default new PrativeClass();
