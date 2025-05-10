import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/users/api`,
    {
      headers: {
        authorization: `${localStorage.getItem("userToken")}`,
      },
    }
  );
  return response.data;
});

// Add Create User

// export const addUser = createAsyncThunk(
//   "admin/addUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       // const response = axios.post(`${import.meta.env.VITE_BACKEND_URL}/ `);
//     } catch (error) {}
//   }
// );

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    fetchUsersData: [],
    loading: false,
    error: null,
  },
});
