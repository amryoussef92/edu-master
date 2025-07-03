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

  const login = async (data) => {
    setLoading(true);
    const decoded = jwtDecode(data.token);
    const email = decoded?.email;

    localStorage.setItem("token", data.token);

    let role = "student"; // Default fallback

    try {
      if (email === "s_admin@gmail.com") {
        // ✅ Super Admin hardcoded
        role = "super-admin";
        console.log("🎯 Super Admin detected:", email);
      } else {
        // ✅ Try admin-only API
        const adminRes = await axios.get(
          "https://edu-master-delta.vercel.app/admin/all-user",
          {
            headers: { token: data.token },
          }
        );

        if (adminRes.data.success) {
          // ✅ Backend allowed access → this is an admin
          role = "admin";
          console.log("🎯 Admin detected:", email);
        }
      }
    } catch (err) {
      console.error("❌ Error detecting role, fallback to student:", err);
      role = "student"; // fallback
    } finally {
      setAuth({
        token: data.token,
        user: email,
        role: role,
      });
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: "", user: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
