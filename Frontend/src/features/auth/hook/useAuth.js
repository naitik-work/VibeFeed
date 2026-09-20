import { useContext, useState } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getMe, logout } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, setUser, loading, setLoading, initialCheckDone } = context;
  const [error, setError] = useState(null);

  const handleLogin = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await login(username, password);
      setUser(response.user);
      return { success: true, user: response.user };
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Login failed. Please check your credentials.";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password, bio, profile_image) => {
    setLoading(true);
    setError(null);
    try {
      const response = await register(username, email, password, bio, profile_image);
      const userData = {
        username: response.username,
        email: response.email,
        bio: response.bio,
        profile_image: response.profile_image,
      };
      setUser(userData);
      return { success: true, user: userData };
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Registration failed. Please try again.";
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    setError,
    handleLogin,
    handleRegister,
    handleLogout,
    initialCheckDone,
  };
};

export default useAuth;