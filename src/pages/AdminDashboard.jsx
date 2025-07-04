import { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/layout/Sidebar";
import Homepage from "./Homepage";
import UserProfile from "../components/main/UserProfile";
import { FaHome, FaUser } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);

  // الصفحات المعروضة في الشريط الجانبي
  const pages = [
    { key: "home", label: "Home", icon: <FaHome /> },
    { key: "profile", label: "Profile", icon: <FaUser /> },
  ];

  // التحقق من التوكن ودور المشرف
  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
      setLoading(false);
      return;
    }
    if (auth.role !== "admin") {
      navigate("/");
      setLoading(false);
      return;
    }
    setLoading(false);
  }, [navigate, auth.token, auth.role]);

  if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><p className="text-gray-800">Loading...</p></div>;

  return (
    <div className="flex h-auto bg-gray-50 relative">
      <Sidebar pages={pages} role="admin" />
      <div className="flex-1 pt-8">
        <Routes>
          <Route path="home" element={<Homepage />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;