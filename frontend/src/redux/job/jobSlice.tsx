import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Job } from "./job.type";
import { createJob, getJobs, updateJob } from "./jobAPI";

export interface JobState {
  jobs: Array<Job>;
  status: "request" | "success" | "failed";
  isLoading: boolean;
}

const initialState: JobState = {
  jobs: [],
  status: "request",
  isLoading: false,
};

export const getJobsAsync = createAsyncThunk(
  "GetJobs",
  async ({ name }: { name: string }) => {
    const response = await getJobs(name);

    return response.data;
  }
);

export const updateJobAsync = createAsyncThunk(
  "UpdateJob",
  async ({ title, approved }: { title: string; approved: boolean }) => {
    const response = await updateJob(title, approved);

    return response.data;
  }
);

export const createJobAsync = createAsyncThunk(
  "CreateJob",
  async ({
    title,
    description,
    rate,
    status,
  }: {
    title: string;
    description: string;
    rate: number;
    status: string;
  }) => {
    const response = await createJob(title, description, Number(rate), status);

    return response.data.user;
  }
);

export const jobSlice = createSlice({
  name: "Job",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJobsAsync.pending, (state) => {
        state.status = "request";
        state.isLoading = true;
      })
      .addCase(getJobsAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(getJobsAsync.rejected, (state) => {
        state.status = "failed";
        state.isLoading = true;
      })
      .addCase(createJobAsync.pending, (state) => {
        state.status = "request";
        state.isLoading = true;
      })
      .addCase(createJobAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.jobs.push({
          ...action.payload,
          approved: false,
        });
      })
      .addCase(createJobAsync.rejected, (state) => {
        state.status = "failed";
        state.isLoading = true;
      })
      .addCase(updateJobAsync.pending, (state) => {
        state.status = "request";
        state.isLoading = true;
      })
      .addCase(updateJobAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.jobs = state.jobs.map((job) => {
          if (job.title === action.payload.title) job.approved = !job.approved;
          return job;
        });
      })
      .addCase(updateJobAsync.rejected, (state) => {
        state.status = "failed";
        state.isLoading = true;
      });
  },
});

// export const { Login } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGetJobStatus = (state: RootState) => state.job.status;
export const selectGetJob = (state: RootState) => state.job.jobs;

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

export default jobSlice.reducer;
