import { ApiInstance, getApiConfig } from "./axios";
import { ACCOUNT_URL, POST_URL } from "./url";

export const postService = {
  getPost(id: string) {
    const config = getApiConfig();
    return ApiInstance.get(`${POST_URL.BASE}/${id}`, config);
  },
  search(request: RequestInterfaces.ICommonSearchRequest) {
    return ApiInstance.post(POST_URL.SEARCH, request, getApiConfig());
  },
};
