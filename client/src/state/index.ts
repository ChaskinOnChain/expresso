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
      state.blogs.data = [...state.blogs.data, ...action.payload.blogs];
    },
    logoutSuccess: (state) => {
      state.user = initialState.user;
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
  setBlogs,
  addBlog,
  updateBlog,
  setCurrentBlog,
  setLoading,
  setBlogError,
} = appSlice.actions;

export default appSlice.reducer;
