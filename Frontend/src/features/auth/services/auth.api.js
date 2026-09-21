import api from "../../../services/api";

export async function login(username, password) {
  const response = await api.post("/api/auth/login", {
    username,
    password,
  });
  return response.data;
}

export async function register(username, email, password, bio, profile_image) {
  const response = await api.post("/api/auth/register", {
    username,
    email,
    password,
    bio,
    profile_image,
  });
  return response.data;
}

export async function getMe() {
  const response = await api.get("/api/auth/get-me");
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