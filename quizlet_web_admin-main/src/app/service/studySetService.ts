import { ICreateSetRequest } from "../interfaces/response";
import { ApiInstance } from "./axios";
import { STUDYSET_URL } from "./url";

export const studySetService = {
  deleteStudySet(userId: string, setId: string) {
    return ApiInstance.delete(`${STUDYSET_URL.BASE}/Delete`, {
      params: {
        userId,
        setId,
      },
    });
  },
  editStudySet(
    userId: string,
    setId: string,
    updatedData: Partial<ICreateSetRequest>
  ) {
    return ApiInstance.put(`${STUDYSET_URL.BASE}/UpdateInfo`, updatedData, {
      params: {
        userId: userId,
        setId: setId,
      },
    });
  },

  createNewSet(userId: string, newData: Partial<ICreateSetRequest>) {
    return ApiInstance.put(`${STUDYSET_URL.BASE}/Create`, newData, {
      params: {
        userId: userId,
      },
    });
  },
};
