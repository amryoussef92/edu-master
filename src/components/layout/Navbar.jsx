import { useAuth } from "../../context/AuthContext";
import { Link, NavLink } from "react-router-dom";
import { FaUser, FaBars } from "react-icons/fa";

export default function Navbar() {
  const { auth, logout, isSidebarOpen, setIsSidebarOpen } = useAuth();
  const isAuthenticated = !!auth.token;

  // Determine dashboard path based on user role
  const dashboardPath =
    auth.role === "super-admin"
      ? "/super-admin/home"
      : auth.role === "admin"
      ? "/admin/home"
      : auth.role === "student"
      ? "/student/home"
      : "/";

  return (
    <header className="bg-white shadow-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-purple-700">
              EduMaster
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-700 font-semibold"
                  : "text-gray-600 hover:text-purple-700"
              }
            >
              Home
            </NavLink>
            {!isAuthenticated && (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-700 font-semibold"
                      : "text-gray-600 hover:text-purple-700"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-700 font-semibold"
                      : "text-gray-600 hover:text-purple-700"
                  }
                >
                  Sign Up
                </NavLink>
              </>
            )}
            {isAuthenticated && (
              <>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="text-gray-600 hover:text-purple-700"
                  title="Toggle Sidebar"
                >
                  <FaBars className="w-6 h-6" />
                </button>
                <NavLink
                  to={dashboardPath}
                  className={({ isActive }) =>
                    isActive
                      ? "text-purple-700 font-semibold"
                      : "text-gray-600 hover:text-purple-700"
                  }
                  title="Go to Dashboard"
                >
                  <FaUser className="w-6 h-6" />
                </NavLink>
                <button
                  onClick={logout}
                  className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}