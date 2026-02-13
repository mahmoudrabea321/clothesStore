import { create } from "zustand";
import axios from "./axios.jsx";
import { toast } from "react-hot-toast";

axios.defaults.withCredentials = true;

const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  

  signup: async ({ name, email, password }) => {
    const res = await axios.post("/auth/signup", {
      name,
      email,
      password,
    });
    set({ user: res.data.user, isAuthenticated: true });
    return res.data;
  },

  login: async ({ email, password }) => {
  try {
    const res = await axios.post("/auth/login", {
      email,
      password,
    });

    set({ user: res.data.user, isAuthenticated: true });
    toast.success("Login successful");
    return res.data.user;

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Login failed"
    );
  }
},

  logout: async () => {
    await axios.post("/auth/logout");
    set({ user: null, isAuthenticated: false });
  },
  checkAuth: async () => {
  try {
    const res = await axios.get("/auth/me");
    set({ user: res.data.user, isAuthenticated: true });
  } catch {
    set({ user: null, isAuthenticated: false });
  }
}
}));

export default useUserStore;
