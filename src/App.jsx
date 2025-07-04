"use client"

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"

// Existing pages
import Homepage from "./pages/Homepage"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import CreateAdminPage from "./pages/CreateAdminPage"
import AdminDashboard from "./pages/AdminDashboard"

// New student components
import StudentLayout from "./components/StudentLayout"
import Dashboard from "./pages/student/Dashboard"
import Lessons from "./pages/student/Lessons"
import MyLessons from "./pages/student/MyLessons"
import Cart from "./pages/student/Cart"
import Exams from "./pages/student/Exams"

function App() {
  const { auth, loading } = useAuth()

  if (loading) return <p>Loading...</p>

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/super-admin"
            element={auth.role === "super-admin" ? <CreateAdminPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/admin"
            element={auth.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/student"
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
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
