import { IUpdateUserResponse, IUserResponse } from "../interfaces/response";
import { ApiInstance } from "./axios";
import { ACCOUNT_URL, USER_URL } from "./url";

export const accountService = {
  getAccount(from: number, to: number) {
    return ApiInstance.get(`${ACCOUNT_URL.BASE}/GetUsers`, {
      params: {
        from: from,
        to: to,
      },
    });
  },

  editAccount(userId: string, updatedData: Partial<IUpdateUserResponse>) {
    return ApiInstance.put(`${USER_URL.BASE}/UpdateInfo`, updatedData, {
      params: {
        userId: userId,
      },
    });
  },

  deleteAccount(userId: string) {
    return ApiInstance.delete(`${ACCOUNT_URL.BASE}/DeleteUser`, {
      params: { userId },
    });
  },
  createAccount(loginName: string, loginPassword: string, dateOfBirth: string) {
    return ApiInstance.post(`User/SignUp`, {
      loginName,
      loginPassword,
      dateOfBirth,
    });
  },
};
