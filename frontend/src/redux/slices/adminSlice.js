import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/users/api`,
      {
        headers: {
          authorization: `${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error occured");
  }
});

export const fetchProducts = createAsyncThunk(
  "admin/fetchProducts",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/products/api`,
        {
          headers: {
            authorization: `${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error occured");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "admin/updateProduct",
  async ({ productData, id }, { rejectWithValue }) => {
    try {
      console.log("Product Data: ff ", productData);
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/admin/product/${id}`,
        productData,
        {
          headers: {
            authorization: `${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    allUsersData: [],
    allProductsData: [],
    totalProducts: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsersData = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching the user data";
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProductsData = Array.isArray(action.payload)
          ? action.payload
          : [];
        state.totalProducts = state.allProductsData.length;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching the user data";
      });
  },
});

// export const { clearCart } = cartSlice.actions;
export default adminSlice.reducer;
