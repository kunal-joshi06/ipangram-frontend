import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfile, loginUser } from "./authAPI";
import toast from "react-hot-toast";

const loginUserAsync = createAsyncThunk("auth/userLogin", async (data) => {
  const response = await loginUser(data);
  return response.data;
});

const getProfileAsync = createAsyncThunk("auth/profile", async (data) => {
  const response = await getProfile(data);
  return response.data;
});

const initialState = {
  token: null,
  user: {},
  loading: false,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        toast.success("Login Successfull");
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.loading = false;
        toast.error("Login Failed");
      })
      .addCase(getProfileAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(getProfileAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export { loginUserAsync, getProfileAsync };

export const { logout } = authSlice.actions;

export default authSlice.reducer;
