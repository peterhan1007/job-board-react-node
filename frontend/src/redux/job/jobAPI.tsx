import axios, { AxiosResponse } from "axios";

import { Job } from "./job.type";
import { Application } from "./application.type";
import { ApplyRequest } from "./applyRequest.type";

const API = axios.create({ baseURL: "http://localhost:3000/api" });

API.interceptors.request.use((req: any) => {
  if (localStorage.getItem("api-token")) {
    req.headers.authorization = `Bearer ${localStorage.getItem("api-token")}`;
  }

  return req;
});

export const getJobs = (): Promise<AxiosResponse<Array<Job>>> =>
  API.get("/job");

export const createJob = (
  title: string,
  description: string,
  rate: number,
  status: string
): Promise<
  AxiosResponse<{
    user: {
      id: number;
      title: string;
      description: string;
      rate: number;
      status: string;
    };
  }>
> => API.post("/job", { title, description, rate, status });

export const updateJob = (
  title: string,
  approved: boolean
): Promise<AxiosResponse<{ title: string }>> =>
  API.patch("/job", { title, approved });

export const createApplication = (
  content: string,
  rate: number
): Promise<AxiosResponse> => API.post("/application", { content, rate });

export const getApplications = (
  title: string
): Promise<AxiosResponse<Array<Application>>> =>
  API.get("/applications", { params: { title } });

export const applyRequest = (
  jobId: number,
  id: number,
  userId: number
): Promise<AxiosResponse<any>> => API.post("/accept", { jobId, id, userId });

export const getApplies = (): Promise<AxiosResponse<Array<ApplyRequest>>> =>
  API.get("/applies", {});
