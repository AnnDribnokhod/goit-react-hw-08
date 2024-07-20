import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, register, refreshUser } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
    },
    token: null,
    isLoggedIn: false,
    isRefreshing: false,
    error: false,
    loading: false,
    isRefreshing: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(register.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log("slice", state);
        console.log("slice", action);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        console.log(action);
        state.error = true;
        state.loading = false;
      })
      .addCase(logIn.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        console.log("state", state);
        console.log("action", action);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.loading = false;
      })
      .addCase(logIn.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(logOut.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = {
          name: null,
          email: null,
        };
        state.token = null;
        state.isLoggedIn = false;
        state.loading = false;
      })
      .addCase(logOut.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.loading = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.loading = false;
      }),
});

export default authSlice.reducer;
