import axios, { AxiosResponse } from "axios";
import { User } from "./user.type";

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

export const getUsers = (): Promise<AxiosResponse<Array<User>>> =>
  API.get("/users", {});

export const updateUser = (
  name: string,
  approved: boolean
): Promise<
  AxiosResponse<{
    name: string;
    role: string;
    title: string;
    description: string;
    rate: number;
    approved: boolean;
  }>
> => API.patch("/user", { name, approved });

export const profile = (
  title: string,
  description: string,
  rate: number
): Promise<
  AxiosResponse<{ user: { title: string; description: string; rate: number } }>
> => API.patch("/profile", { title, description, rate });
// export const createJob = (
//   title: string,
//   description: string,
//   rate: number,
//   status: string
// ): Promise<
//   AxiosResponse<{
//     user: {
//       title: string;
//       description: string;
//       rate: number;
//       status: string;
//     };
//   }>
// > => API.post("/job", { title, description, rate, status });

// export const updateJob = (
//   title: string,
//   approved: boolean
// ): Promise<AxiosResponse<string>> => API.patch("/job", { title, approved });

/*
name: string;
  password: string;
  role: string;
  title: string;
  description: string;
  rate: number;
  approved: boolean;
*/
