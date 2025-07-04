import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Homepage from "./pages/Homepage"; // ✅ New Homepage
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CreateAdminPage from "./pages/CreateAdminPage";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  const { auth, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // 🔥 Spinner while fetching role

  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Root Homepage */}
        <Route path="/" element={<Homepage />} />

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Super Admin Route */}
        <Route
          path="/super-admin"
          element={
            auth.role === "super-admin" ? (
              <CreateAdminPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Admin Route */}
        <Route
          path="/admin"
          element={
            auth.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Student Route */}
        <Route
          path="/student"
          element={
            auth.role === "student" ? (
              <StudentDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
