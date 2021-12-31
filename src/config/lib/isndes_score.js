import { request } from "@/utils/request.js";

export default (async () => {
  return await request({
    url: "https://www.isndes.com/getJFRule",
    method: "get",
  });
})();
