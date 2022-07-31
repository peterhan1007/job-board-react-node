import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { profile } from "../../redux/user/userAPI";
import { string } from "yup";
import { RootState } from "../../app/store";
import { getProfileWithToken, Login, Register } from "./authAPI";

export interface AuthState {
  username: string;
  role: string;
  title: string;
  description: string;
  rate: number;
  status: "request" | "success" | "failed";
  isLoading: boolean;
}

const initialState: AuthState = {
  username: "",
  role: "FREELANCER",
  title: "",
  description: "",
  rate: 0,
  status: "request",
  isLoading: false,
};

export const loginAsync = createAsyncThunk(
  "Login",
  async ({ name, password }: { name: string; password: string }) => {
    const response = await Login(name, password);

    return response.data.user;
  }
);

export const getProfileWithTokenAsync = createAsyncThunk(
  "GetProfileWithToken",
  async ({ token }: { token: string }) => {
    const response = await getProfileWithToken(token);

    return response.data;
  }
);

export const registerAsync = createAsyncThunk(
  "Register",
  async ({
    name,
    password,
    title,
    description,
    rate,
    radio,
  }: {
    name: string;
    password: string;
    title: string;
    description: string;
    rate: Number;
    radio: string;
  }) => {
    const response = await Register(
      name,
      password,
      title,
      description,
      Number(rate),
      radio === "1" ? "FREELANCER" : "CLIENT"
    );

    return response.data.user;
  }
);

export const profileAsync = createAsyncThunk(
  "Profile",
  async ({
    title,
    description,
    rate,
  }: {
    title: string;
    description: string;
    rate: number;
  }) => {
    const response = await profile(title, description, rate);

    return response.data.user;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    init: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "request";
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        const { name, role, title, description, rate, token } = action.payload;
        state.status = "success";
        state.isLoading = false;
        state.username = name;
        state.role = role;
        state.title = title;
        state.description = description;
        state.rate = rate;
        localStorage.setItem("api-token", token);
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = "failed";
        state.isLoading = true;
      })
      .addCase(getProfileWithTokenAsync.pending, (state) => {
        state.status = "request";
        state.isLoading = true;
      })
      .addCase(getProfileWithTokenAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.username = action.payload.name;
        state.role = action.payload.role;
        state.title = action.payload.title;
        state.description = action.payload.description;
        state.rate = action.payload.rate;
      })
      .addCase(getProfileWithTokenAsync.rejected, (state) => {
        state.status = "failed";
        state.isLoading = true;
      })
      .addCase(profileAsync.pending, (state) => {
        state.status = "request";
        state.isLoading = true;
      })
      .addCase(profileAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.rate = action.payload.rate;
        state.description = action.payload.description;
        state.title = action.payload.title;
      })
      .addCase(profileAsync.rejected, (state) => {
        state.status = "failed";
        state.isLoading = true;
      });
  },
});

export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthName = (state: RootState) => state.auth.username;
export const selectAuthRole = (state: RootState) => state.auth.role;
export const selectAuthTitle = (state: RootState) => state.auth.title;
export const selectAuthRate = (state: RootState) => state.auth.rate;
export const selectAuthdescription = (state: RootState) =>
  state.auth.description;

export const { init } = authSlice.actions;
// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default authSlice.reducer;
