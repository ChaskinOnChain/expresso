import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    _id: null,
    username: null,
    email: null,
    ethereum_address: null,
    role: null,
    img: null,
    isLoggedIn: false,
    error: null,
    token: null,
  },
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = { ...state.user, ...action.payload.user };
      state.user.token = action.payload.token;
      state.user.isLoggedIn = true;
    },
    logoutSuccess: (state) => {
      state.user = initialState.user;
      localStorage.clear();
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setUserError: (state, action) => {
      state.user.error = action.payload;
    },
  },
});

export const {
  loginSuccess,
  logoutSuccess,
  updateUser,
  setUserError,
  setLoading,
} = appSlice.actions;

export default appSlice.reducer;
