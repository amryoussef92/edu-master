import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || "",
    user: null,
    role: null,
  });
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const login = async (data) => {
    setLoading(true);
    try {
      const decoded = jwtDecode(data.token);
      const email = decoded?.email;

      if (!email) {
        throw new Error("Invalid token: email not found");
      }

      localStorage.setItem("token", data.token);

      let role = "student"; // Default fallback

      if (email === "s_admin@gmail.com") {
        role = "super-admin";
        console.log("🎯 Super Admin detected:", email);
      } else {
        try {
          const adminRes = await axios.get(
            "https://edu-master-delta.vercel.app/admin/all-user",
            {
              headers: { Authorization: `Bearer ${data.token}` }, // Improved: Use Bearer token
            }
          );

          if (adminRes.data.success) {
            role = "admin";
            console.log("🎯 Admin detected:", email);
          }
        } catch (adminError) {
          console.error("❌ Admin check failed, fallback to student:", adminError.message);
          role = "student";
        }
      }

      setAuth({
        token: data.token,
        user: email,
        role: role,
      });
    } catch (err) {
      console.error("❌ Login error:", err.message);
      setAuth({ token: "", user: null, role: null });
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: "", user: null, role: null });
    setIsSidebarOpen(true); // Reset sidebar to open on logout
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading, isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);