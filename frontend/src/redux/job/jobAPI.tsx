import axios, { AxiosResponse } from "axios";
import { Job } from "./job.type";

declare module "axios" {
  export interface AxiosRequestConfig {
    name?: string;
  }
}

const API = axios.create({ baseURL: "http://localhost:3000/api" });

API.interceptors.request.use((req: any) => {
  if (localStorage.getItem("api-token")) {
    req.headers.authorization = `Bearer ${localStorage.getItem("api-token")}`;
  }

  return req;
});

export const getJobs = (name: string): Promise<AxiosResponse<Array<Job>>> =>
  API.get("/job", { name });

export const createJob = (
  title: string,
  description: string,
  rate: number,
  status: string
): Promise<
  AxiosResponse<{
    user: {
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
