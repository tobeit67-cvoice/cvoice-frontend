import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export type APIResponse<T> = {
  data?: T;
  success: boolean;
  message?: string;
};

export type S2TResult = {
  content?: string;
  id: string;
  status: "error" | "done" | "running" | "pending";
};
