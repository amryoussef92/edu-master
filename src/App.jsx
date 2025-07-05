"use client"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Existing pages
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import UserProfile from "./components/main/UserProfile";
import AllUsersComponent from "./components/super-admin/AllUsersComponent";

// New components
import StudentLayout from "./components/StudentLayout";
import Dashboard from "./pages/student/Dashboard";
import Lessons from "./pages/student/Lessons";
import MyLessons from "./pages/student/MyLessons";
import Cart from "./pages/student/Cart";
import Exams from "./pages/student/Exams";
import SuperAdminLayout from "./components/SuperAdminLayout";
import AdminLayout from "./components/AdminLayout";

// Layouts
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  const { auth, loading } = useAuth();

  if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><p className="text-gray-800">Loading...</p></div>;

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/super-admin/*"
            element={auth.role === "super-admin" ? <SuperAdminLayout /> : <Navigate to="/login" replace />}
          >
            <Route path="home" element={<Homepage />} />
            <Route path="users" element={<AllUsersComponent />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="*" element={<Homepage />} />
          </Route>
          <Route
            path="/admin/*"
            element={auth.role === "admin" ? <AdminLayout /> : <Navigate to="/login" replace />}
          >
            <Route path="home" element={<Homepage />} />
            <Route path="users" element={<AllUsersComponent />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="*" element={<Homepage />} />
          </Route>
          <Route
            path="/student/*"
            element={auth.role === "student" ? <StudentLayout /> : <Navigate to="/login" replace />}
          >
            <Route index element={<Dashboard />} />
            <Route path="lessons" element={<Lessons />} />
            <Route path="my-lessons" element={<MyLessons />} />
            <Route path="cart" element={<Cart />} />
            <Route path="exams" element={<Exams />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;