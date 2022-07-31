import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import jobReducer from "../redux/job/jobSlice";
import userReducer from "../redux/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
