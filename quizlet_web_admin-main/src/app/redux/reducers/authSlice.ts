import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLogin: boolean;
  account: ResponseInterfaces.IAccount | null;
}

const initialState: AuthState = {
  isLogin: false,
  account: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
    loadAccount(state, action: PayloadAction<ResponseInterfaces.IAccount>) {
      state.account = action.payload;
    },
  },
});

export const { login, logout, loadAccount } = authSlice.actions;
export default authSlice.reducer;
