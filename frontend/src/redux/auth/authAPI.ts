import axios, { AxiosResponse } from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    token?: string;
  }
}

const API = axios.create({ baseURL: "http://localhost:3000/api" });

API.interceptors.request.use((req: any) => {
  if (localStorage.getItem("api-token")) {
    req.headers.authorization = `Bearer ${localStorage.getItem("api-token")}`;
  }

  return req;
});

export const Login = (
  name: string,
  password: string
): Promise<
  AxiosResponse<{
    user: {
      id: number;
      name: string;
      role: string;
      title: string;
      description: string;
      rate: number;
      token: string;
    };
  }>
> => API.post("/login", { name, password });

export const Register = (
  name: string,
  password: string,
  title: string,
  description: string,
  rate: number,
  radio: string
): Promise<AxiosResponse<{ user: { name: string; token: string } }>> =>
  API.post("/users", { name, password, title, description, rate, radio });

export const getProfileWithToken = (
  token: string
): Promise<
  AxiosResponse<{
    id: number;
    name: string;
    role: string;
    description: string;
    rate: number;
    title: string;
  }>
> => API.get("/getProfileWithToken", { token });
