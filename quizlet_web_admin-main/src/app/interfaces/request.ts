namespace RequestInterfaces {
  export interface ICommonSearchRequest {
    page?: number;
    pageSize?: number;
    sortDir?: "ASC" | "DESC";
    sortBy?: string;
    keyword?: string;
  }

  export interface ICommonDeleteRequest {
    ids: string[];
  }

  export interface ILoginRequest {
    phoneNumber: string;
    password: string;
  }
}
