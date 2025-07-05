import { useAuth } from "../../context/AuthContext";
import { Link, NavLink } from "react-router-dom";
import { FaUser, FaBars } from "react-icons/fa";

export default function Navbar() {
  const { auth, logout } = useAuth();
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

  // Navigation items
  const navItems = [
    { to: "/", label: "Home" },
    ...(isAuthenticated
      ? [
          { to: dashboardPath, label: "Dashboard", icon: <FaUser className="w-6 h-6" /> },
          { to: "#", label: "Logout", onClick: logout, className: "bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800 transition-colors" },
        ]
      : [
          { to: "/login", label: "Login" },
          { to: "/signup", label: "Sign Up" },
        ]),
  ];

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
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item, index) => (
                item.onClick ? (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className={item.className}
                  >
                    {item.label}
                  </button>
                ) : (
                  <NavLink
                    key={index}
                    to={item.to}
                    className={({ isActive }) =>
                      isActive
                        ? "text-purple-700 font-semibold"
                        : "text-gray-600 hover:text-purple-700"
                    }
                    title={item.label === "Dashboard" ? "Go to Dashboard" : undefined}
                  >
                    {item.icon || item.label}
                  </NavLink>
                )
              ))}
            </div>

            {/* Mobile Dropdown */}
            <div className="md:hidden flex items-center">
              <div className="relative">
                <button
                  className="text-gray-600 hover:text-purple-700 focus:outline-none"
                  onClick={() => document.getElementById("mobile-menu").classList.toggle("hidden")}
                >
                  <FaBars className="w-6 h-6" />
                </button>
                <div
                  id="mobile-menu"
                  className="hidden absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10"
                >
                  {navItems.map((item, index) => (
                    item.onClick ? (
                      <button
                        key={index}
                        onClick={item.onClick}
                        className={`block w-full text-left px-4 py-2 text-gray-600 hover:bg-purple-100 ${item.className}`}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <NavLink
                        key={index}
                        to={item.to}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-gray-600 hover:bg-purple-100 ${isActive ? "text-purple-700 font-semibold" : ""}`
                        }
                        onClick={() => document.getElementById("mobile-menu").classList.add("hidden")}
                      >
                        {item.label}
                      </NavLink>
                    )
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}