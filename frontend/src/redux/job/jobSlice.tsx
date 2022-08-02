import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";
import { Application } from "./application.type";
import { ApplyRequest } from "./applyRequest.type";
import { Job } from "./job.type";
import {
  applyRequest,
  createApplication,
  createJob,
  getApplications,
  getApplies,
  getJobs,
  updateJob,
} from "./jobAPI";

export interface JobState {
  jobs: Array<Job>;
  bids: Array<Application>;
  status: "request" | "success" | "failed";
  isLoading: boolean;
  applies: Array<ApplyRequest>;
}

const initialState: JobState = {
  jobs: [],
  bids: [],
  applies: [],
  status: "request",
  isLoading: false,
};

export const getJobsAsync = createAsyncThunk("GetJobs", async () => {
  const response = await getJobs();

  return response.data;
});

export const updateJobAsync = createAsyncThunk(
  "UpdateJob",
  async ({ title, approved }: { title: string; approved: boolean }) => {
    const response = await updateJob(title, approved);

    return response.data;
  }
);

export const applyRequestAsync = createAsyncThunk(
  "ApplyRequest",
  async ({
    jobId,
    id,
    userId,
  }: {
    jobId: number;
    id: number;
    userId: number;
  }) => {
    const response = await applyRequest(jobId, id, userId);

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

export const createApplicationAsync = createAsyncThunk(
  "CreateApplication",
  async ({ content, rate }: { content: string; rate: number }) => {
    const response = await createApplication(content, rate);

    return response.data.user;
  }
);

export const getApplicationsAsync = createAsyncThunk(
  "getApplications",
  async ({ title }: { title: string }) => {
    const response = await getApplications(title);

    return response.data;
  }
);

export const getAppliesAsync = createAsyncThunk("getApplies", async () => {
  const response = await getApplies();

  return response.data;
});

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
      })
      .addCase(getApplicationsAsync.pending, (state) => {
        state.status = "request";
        state.isLoading = true;
      })
      .addCase(getApplicationsAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.bids = action.payload;
      })
      .addCase(getApplicationsAsync.rejected, (state) => {
        state.status = "failed";
        state.isLoading = true;
      })
      .addCase(getAppliesAsync.pending, (state) => {
        state.status = "request";
        state.isLoading = true;
      })
      .addCase(getAppliesAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.isLoading = false;
        state.applies = action.payload;
      })
      .addCase(getAppliesAsync.rejected, (state) => {
        state.status = "failed";
        state.isLoading = true;
      });
  },
});

export const selectGetJobStatus = (state: RootState) => state.job.status;
export const selectGetJob = (state: RootState) => state.job.jobs;
export const selectGetBids = (state: RootState) => state.job.bids;
export const selectGetApplies = (state: RootState) => state.job.applies;

export default jobSlice.reducer;
