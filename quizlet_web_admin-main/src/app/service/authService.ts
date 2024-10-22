import { ApiInstance } from "./axios";
import { AUTH_URL } from "./url";

export const authService = {
  login(request: RequestInterfaces.ILoginRequest) {
    return ApiInstance.post(AUTH_URL.LOG_IN, request);
  },
};
