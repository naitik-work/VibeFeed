import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true, // cookies/token should be included
});

export async function login(username, password) {
  const response = await api.post("/login", {
    username,
    password,
  });
  return response.data;
}

export async function register(username, email, password, bio, profile_image) {
  const response = await api.post("/register", {
    username,
    email,
    password,
    bio,
    profile_image,
  });
  return response.data;
}

export async function getMe() {
  const response = await api.get("/get-me");
  return response.data;
}

export async function logout() {
  // Clear any client cookies/storage
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  return { success: true };
}

export default {
  login,
  register,
  getMe,
  logout
};