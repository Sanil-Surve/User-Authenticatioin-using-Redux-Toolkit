// ../app/userSlice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: null,
  isRegistered: false,
};

export const registerUserAsync = createAsyncThunk(
  "user/registerUserAsync",
  async ({ firstName, lastName, email, password }) => {
    try {
      const response = await axios.post("http://localhost:8080/create-user", {
        firstName,
        lastName,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      state.currentUser = action.payload;
      state.isRegistered = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isRegistered = true;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        console.error("Registration failed:", action.error.message);
        alert("Registration failed. Please try again.");
      });
  },
});

export const { registerUser } = userSlice.actions;
export const selectUser = (state) => state.user;

export default userSlice.reducer;
