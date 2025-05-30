import { AxiosError } from "axios";
import axiosInstance from "./axios";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import {
  LoginProps,
  LoginResponse,
  RegisterProps,
  RegisterResponse,
} from "@/types/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

async function Login(data: LoginProps): Promise<LoginResponse> {
  const response = await axiosInstance.post<LoginResponse>(`users/login`, data);
  return response.data;
}

export function useLogin() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  return useMutation<LoginResponse, AxiosError, LoginProps>({
    mutationFn: Login,
    onSuccess: (data) => {
      /*       console.log(data); */
      toast.success(data.message || "User logged in successfully");
      setUser(data.data);
      navigate("/");
    },
    onError: (error) => {
/*       console.log(error); */
      toast.error(error.message);
    },
  });
}

async function Register(data: RegisterProps): Promise<RegisterResponse> {
  const response = await axiosInstance.post<RegisterResponse>(
    `/users/register`,
    data
  );
  return response.data;
}

export function useRegister() {
  const navigate = useNavigate();
  return useMutation<RegisterResponse, AxiosError, RegisterProps>({
    mutationFn: Register,
    onSuccess: (data) => {
      toast.success(data.message || "User registration successfull");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message || "User registration failed");
    },
  });
}

async function Logout() {
  const response = await axiosInstance.post(`users/logout`);
  return response.data;
}

export function useLogout() {
  const { setUser } = useAuth();
  return useMutation({
    mutationFn: Logout,
    onSuccess: (data) => {
      toast.success(data.message || "Logged out successfully");
      setUser(null);
    },
    onError: (error) => {
      toast.error(error.message || "Logout failed");
    },
  });
}
