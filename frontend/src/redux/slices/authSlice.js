import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

function checkIsAdmin() {
  const isAdmin = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")).role === "admin"
    : false;
  return isAdmin;
}

// Initial State
const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  userRoleData: null,
  isAdmin: checkIsAdmin(),
  allUserData: [],
  loading: false,
  error: null,
};

// Async Thunk for Deleting the User from Database
export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_BACKEND_URL}/users/delete`,
        data: { userId },
        headers: {
          authorization: `${localStorage.getItem("userToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || "Erro Deleting User");
    }
  }
);

// Async Thunk for updating the user Role
export const userRole = createAsyncThunk(
  "auth/userRole",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/users/update-role`,
        { userId, role },
        {
          headers: {
            authorization: `${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Async Thunk for User Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/login`,
        userData
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk for User Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/users/register`,
        userData
      );
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId);
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.allUserData = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRole.fulfilled, (state, action) => {
        state.loading = false;
        state.userRoleData = action.payload;
      })
      .addCase(userRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAdmin = action.payload.role === "admin";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;
