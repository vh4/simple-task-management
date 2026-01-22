
"use client";
import axiosInstance from "@/api/middleware";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export const login = async (data: LoginRequest): Promise<any> => {
  const response = await axiosInstance.post<any>('/auth/login', data);
  return response;
};

export const register = async (data: RegisterRequest): Promise<any> => {
  const response = await axiosInstance.post<any>('/user', data);
  return response;
};