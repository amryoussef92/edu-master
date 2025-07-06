"use client";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Public pages
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

// Admin/super-admin pages
import CreateAdminPage from "./pages/CreateAdminPage";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";

// Student area
import StudentLayout from "./components/StudentLayout";
import Dashboard from "./pages/student/Dashboard";
import Lessons from "./pages/student/Lessons";
import MyLessons from "./pages/student/MyLessons";
import Cart from "./pages/student/Cart";
import Exams from "./pages/student/Exams";

// Profile area
import Profile from "./pages/Profile/Profile";
import ProfileLayout from "./pages/Profile/ProfileLayout";
import EditProfile from "./pages/Profile/EditProfile";
import MyCourses from "./pages/Profile/MyCourses";
import ReviewsSection from "./pages/Profile/Reviews";
import Teachers from "./pages/Profile/Teachers";

function App() {
  const { auth, loading } = useAuth();

  // ✅ Wait until auth is checked
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Super Admin */}
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

          {/* Admin */}
          <Route
            path="/admin"
            element={
              auth.role === "admin" ? (
                <AdminLayout />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<div className="p-6"><h2 className="text-2xl font-bold">Users Management</h2><p>Coming soon...</p></div>} />
            <Route path="lessons" element={<div className="p-6"><h2 className="text-2xl font-bold">Lessons Management</h2><p>Coming soon...</p></div>} />
            <Route path="exams" element={<div className="p-6"><h2 className="text-2xl font-bold">Exams Management</h2><p>Coming soon...</p></div>} />
            <Route path="revenue" element={<div className="p-6"><h2 className="text-2xl font-bold">Revenue Analytics</h2><p>Coming soon...</p></div>} />
            <Route path="settings" element={<div className="p-6"><h2 className="text-2xl font-bold">Admin Settings</h2><p>Coming soon...</p></div>} />
          </Route>

          {/* Student */}
          <Route
            path="/student"
            element={
              auth.role === "student" ? (
                <StudentLayout />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="lessons" element={<Lessons />} />
            <Route path="my-lessons" element={<MyLessons />} />
            <Route path="cart" element={<Cart />} />
            <Route path="exams" element={<Exams />} />
          </Route>

          {/* Profile */}
          <Route
            path="/profile"
            element={
              auth.role === "student" ? (
                <ProfileLayout />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route index element={<Profile />} />{" "}
            {/* Shows summary with edit button */}
            <Route path="edit" element={<EditProfile />} />{" "}
            {/* Shows editable form */}
            <Route path="courses" element={<MyCourses />} />
            <Route path="reviews" element={<ReviewsSection />} />
            <Route path="teachers" element={<Teachers />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
