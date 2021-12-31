const baseUrl = "";

export function request({ url, header = {}, data, method, success, fail, complete, responseType }) {
  if (/^\//.test(url)) {
    url = baseUrl + url;
  }
  return new Promise((reslove, reject) => {
    uni.request({
      url,
      header,
      data,
      method,
      success: (res) => {
        if (success instanceof Function) {
          success(res);
        }
        reslove(res);
      },
      fail: (err) => {
        if (fail instanceof Function) {
          fail(err);
        }
        reject(err);
      },
      complete,
      responseType,
    });
  });
}
