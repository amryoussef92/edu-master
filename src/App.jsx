import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CreateAdminPage from "./pages/CreateAdminPage";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import UserProfile from "./components/main/UserProfile";

function App() {
  const { auth, loading } = useAuth();

  if (loading) return <div className="flex h-screen items-center justify-center bg-gray-50"><p className="text-gray-800">Loading...</p></div>;

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/super-admin/*"
              element={
                auth.role === "super-admin" ? (
                  <SuperAdminDashboard />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            >
              <Route path="home" element={<Homepage />} />
              <Route path="profile" element={<UserProfile />} />
              <Route index element={<Navigate to="home" replace />} />
            </Route>
            <Route
              path="/admin/*"
              element={
                auth.role === "admin" ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            >
              <Route path="home" element={<Homepage />} />
              <Route path="profile" element={<UserProfile />} />
              <Route index element={<Navigate to="home" replace />} />
            </Route>
            <Route
              path="/student/*"
              element={
                auth.role === "student" ? (
                  <StudentDashboard />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            >
              <Route path="home" element={<Homepage />} />
              <Route path="profile" element={<UserProfile />} />
              <Route index element={<Navigate to="home" replace />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;