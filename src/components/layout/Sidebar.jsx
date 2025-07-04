import { FaArrowLeft, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar({ pages, role }) {
  const { logout, isSidebarOpen, setIsSidebarOpen } = useAuth();

  return (
    <>
      <div
        className={`fixed top-[64px] bottom-0 bg-white shadow-xl z-30 transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          width: isSidebarOpen ? "260px" : "0",
          minHeight: "calc(100vh - 64px - 64px)", // Adjust for header (64px) and footer (64px)
          display: isSidebarOpen ? "block" : "none",
        }}
      >
        <div className="bg-gray-800 flex flex-col h-full p-3 pt-6">
          <button
            className="p-3 mb-6 bg-white text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200 self-center"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <ul className="space-y-3 flex-1">
            {pages.map(({ key, label, icon }) => (
              <li key={key}>
                <NavLink
                  to={`/${role}/${key}`}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-purple-700 text-white font-bold shadow-lg"
                        : "bg-white text-gray-800 hover:bg-gray-300"
                    } ${isSidebarOpen ? "justify-start px-4" : "justify-center"}`
                  }
                >
                  {icon}
                  {isSidebarOpen && <span className="text-sm font-semibold">{label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            onClick={logout}
            className="mt-auto p-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-all duration-200"
          >
            {isSidebarOpen ? "Logout" : <FaArrowLeft className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {!isSidebarOpen && (
        <button
          className="fixed top-[80px] left-4 p-3 bg-white text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200 z-40"
          onClick={() => setIsSidebarOpen(true)}
          title="Open Sidebar"
        >
          <FaBars className="w-5 h-5" />
        </button>
      )}
    </>
  );
}