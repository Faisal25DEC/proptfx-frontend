import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../utils/config";
import axios from "axios";
import { toast } from "sonner";

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (token) => {
    try {
      const res = await axios.get(`${baseUrl}/users/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData) => {
    try {
      toast.loading("Logging in user");
      const res = await axios.post(`${baseUrl}/users/login`, formData);
      console.log(res);
      localStorage.setItem("jwt_token", JSON.stringify(res.data.token));
      toast.success(res.data.msg);
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  }
);
export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (formData) => {
    try {
      toast.loading("Registering User");
      const res = await axios.post(`${baseUrl}/users/signup`, formData);
      toast.success("Registered Successfully");
      return res.data;
    } catch (error) {
      toast.error("Registeration failed");
      console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    signup: false,
    auth: false,
    currentUser: null,
    currentUserPending: false,
    currentUserError: false,
  },
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("jwt_token");
      state.auth = false;
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.currentUserPending = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.currentUserPending = false;
        state.currentUserError = false;
        state.auth = true;
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        console.log("rejected");
        state.currentUserPending = false;
        state.currentUserError = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("first");
        state.signup = false;
        state.auth = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.signup = true;
      });
  },
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
