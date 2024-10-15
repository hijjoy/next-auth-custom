import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";
import { getServerSession } from "next-auth";

const axiosConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosInstance = axios.create(axiosConfig);
const axiosClient = axios.create(axiosConfig);

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getServerSession(authOptions);

    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance, axiosClient };
