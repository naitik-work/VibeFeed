import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const cached = localStorage.getItem('vibefeed_user');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getMe();
        if (data?.user) {
          setUser(data.user);
          localStorage.setItem('vibefeed_user', JSON.stringify(data.user));
        }
      } catch {
        // If not logged in, keep guest state or cached user
      } finally {
        setInitialCheckDone(true);
      }
    };
    checkAuth();
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('vibefeed_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('vibefeed_user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser: updateUser, loading, setLoading, initialCheckDone }}>
      {children}
    </AuthContext.Provider>
  );
};