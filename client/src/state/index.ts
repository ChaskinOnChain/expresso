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
  blogs: {
    data: [],
    error: null,
    isLoading: false,
    searchQuery: "",
    filterTags: [],
    currentBlog: {
      id: null,
      title: null,
      author: null,
      date: null,
      content: null,
      tags: [],
      comments: [],
    },
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
    setBlogs: (state, action) => {
      state.blogs.data = action.payload;
    },
    addBlog: (state, action) => {
      state.blogs.data.push(action.payload);
    },
    updateBlog: (state, action) => {
      const index = state.blogs.data.findIndex(
        (blog) => blog.id === action.payload.id
      );
      if (index !== -1) {
        state.blogs.data[index] = {
          ...state.blogs.data[index],
          ...action.payload,
        };
      }
    },
    setCurrentBlog: (state, action) => {
      state.blogs.currentBlog = action.payload;
    },
    setLoading: (state, action) => {
      state.blogs.isLoading = action.payload;
    },
    setBlogError: (state, action) => {
      state.blogs.error = action.payload;
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
