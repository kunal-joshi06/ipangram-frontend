import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  addDepartment,
  deleteDepartment,
  editDepartment,
  getDepartments,
} from "./departmentAPI";

const getDepartmentsAsync = createAsyncThunk(
  "department/getDepartments",
  async () => {
    const response = await getDepartments();
    return response.data;
  }
);

const addDepartmentAsync = createAsyncThunk(
  "department/addDepartment",
  async (data) => {
    const response = await addDepartment(data);
    return response.data;
  }
);

const editDepartmentAsync = createAsyncThunk(
  "department/editDepartment",
  async ({ id, data }) => {
    const response = await editDepartment(id, data);
    return response.data;
  }
);

const deleteDepartmentAsync = createAsyncThunk(
  "department/deleteDepartment",
  async (id) => {
    const response = await deleteDepartment(id);
    return response.data;
  }
);

const initialState = {
  departments: [],
  loading: false,
};

export const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDepartmentsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDepartmentsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload.departments;
      })
      .addCase(getDepartmentsAsync.rejected, (state) => {
        state.loading = false;
        toast.error("Department Fetch Failed");
      })
      .addCase(addDepartmentAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDepartmentAsync.fulfilled, (state, action) => {
        const newDepartment = action.payload.department;
        state.departments = [...state.departments, newDepartment];
        state.loading = false;
        toast.success("Deparatment added successfully!");
      })
      .addCase(addDepartmentAsync.rejected, (state) => {
        state.loading = false;
        toast.error("Adding Department Failed");
      })
      .addCase(editDepartmentAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(editDepartmentAsync.fulfilled, (state, action) => {
        const updatedDepartment = action.payload.department;
        state.departments = state.departments.map((department) =>
          department._id === updatedDepartment._id
            ? updatedDepartment
            : department
        );
        state.loading = false;
        toast.success("Changes successful!");
      })
      .addCase(editDepartmentAsync.rejected, (state) => {
        state.loading = false;
        toast.error("Failed to edit");
      })
      .addCase(deleteDepartmentAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDepartmentAsync.fulfilled, (state, action) => {
        const departmentIdToRemove = action.meta.arg;
        state.departments = state.departments.filter(
          (department) => department._id !== departmentIdToRemove
        );
        state.loading = false;
        toast.success("Department removed successfully!");
      })
      .addCase(deleteDepartmentAsync.rejected, (state) => {
        state.loading = false;
        toast.error("Removing Department failed");
      });
  },
});

export {
  getDepartmentsAsync,
  deleteDepartmentAsync,
  editDepartmentAsync,
  addDepartmentAsync,
};

export default departmentSlice.reducer;
