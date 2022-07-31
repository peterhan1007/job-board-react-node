import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "./user.type";
import { getUsers, profile, updateUser } from "./userAPI";

export interface UserState {
  users: Array<User>;
  status: "request" | "success" | "failed";
  isLoading: boolean;
}

const initialState: UserState = {
  users: [],
  status: "request",
  isLoading: false,
};

export const getUsersAsync = createAsyncThunk("GetUsers", async () => {
  const response = await getUsers();

  return response.data;
});

export const updateUserAsync = createAsyncThunk(
  "UpdateUser",
  async ({ name, approved }: { name: string; approved: boolean }) => {
    const response = await updateUser(name, approved);

    return response.data;
  }
);

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.status = "request";
        state.isLoading = true;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsersAsync.rejected, (state) => {
        state.status = "failed";
        state.isLoading = true;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "request";
        state.isLoading = true;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.users = state.users.map((user) => {
          if (user.name === action.payload.name) user.approved = !user.approved;

          return user;
        });
      })
      .addCase(updateUserAsync.rejected, (state) => {
        state.status = "failed";
        state.isLoading = true;
      });
  },
});

// export const { Login } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGetUsers = (state: RootState) => state.user.users;

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

export default userSlice.reducer;
