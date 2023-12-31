import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { getUsers } from "./userAPI";

const getUsersAsync = createAsyncThunk(
  "user/getUsers",
  async ({ page, sortBy, sortOrder }) => {
    const response = await getUsers(page, sortBy, sortOrder);
    return response.data;
  }
);

const initialState = {
  pagination: {},
  users: [],
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.pagination = action.payload.pagination;
      })
      .addCase(getUsersAsync.rejected, (state) => {
        state.loading = false;
        toast.error("User Fetch Failed");
      });
  },
});

export { getUsersAsync };

export default userSlice.reducer;
