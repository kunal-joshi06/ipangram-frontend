import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { addUser, deleteUser, editUser, getUsers } from "./userAPI";

const getUsersAsync = createAsyncThunk(
  "user/getUsers",
  async ({ page, sortBy, sortOrder }) => {
    const response = await getUsers(page, sortBy, sortOrder);
    return response.data;
  }
);

const addUserAsync = createAsyncThunk("user/addUser", async (data) => {
  const response = await addUser(data);
  return response.data;
});

const editUserAsync = createAsyncThunk(
  "user/editUser",
  async ({ id, data }) => {
    const response = await editUser(id, data);
    return response.data;
  }
);

const deleteUserAsync = createAsyncThunk("user/deleteUser", async (id) => {
  const response = await deleteUser(id);
  return response.data;
});

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
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        const userIdToRemove = action.meta.arg;
        state.users = state.users.filter((user) => user._id !== userIdToRemove);
        state.loading = false;
        toast.success("User removed successfully!");
      })
      .addCase(deleteUserAsync.rejected, (state) => {
        state.loading = false;
        toast.error("Removing user failed");
      })
      .addCase(addUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        const newUser = action.payload.user;
        state.users = [...state.users, newUser];
        state.loading = false;
        toast.success("User added successfully!");
      })
      .addCase(addUserAsync.rejected, (state) => {
        state.loading = false;
        toast.error("Adding User Failed");
      })
      .addCase(editUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUserAsync.fulfilled, (state, action) => {
        const updatedUser = action.payload.user;
        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
        state.loading = false;
        toast.success("Changes successful!");
      })
      .addCase(editUserAsync.rejected, (state) => {
        state.loading = false;
        toast.error("Failed to edit");
      });
  },
});

export { getUsersAsync, deleteUserAsync, addUserAsync, editUserAsync };

export default userSlice.reducer;
