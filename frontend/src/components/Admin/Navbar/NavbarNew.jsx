import React, { useEffect, useState } from "react";
import {
  Bell,
  Calendar,
  FileText,
  LayoutDashboard,
  Megaphone,
  Menu,
  LogOut as LogoutIcon,
  Settings,
  User,
  ChevronDown,
  Sun,
  Moon,
  Zap,
  TrendingDown,
  TrendingUp,
  Users,
  LogOutIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, reset } from "../../../features/authSlice";
import { toast } from "react-toastify";
import ChangePasswordModalAdmin from "../ChangePasswordModalAdmin";

const NavbarNew = ({ setSidebarOpen, setIsChangePassOpen }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const notifications = [
    {
      id: 1,
      title: "New message received",
      time: "2 min ago",
      type: "message",
    },
    {
      id: 2,
      title: "System update available",
      time: "1 hour ago",
      type: "system",
    },
    { id: 3, title: "Meeting reminder", time: "3 hours ago", type: "reminder" },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    dispatch(LogOut()); // Memanggil action logout dari Redux
    dispatch(reset()); // Mengatur ulang state auth
    navigate("/ertero-admin-login"); // Navigasi ke halaman /pengurus setelah logout
    toast.success("Logout berhasil");
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 relative z-40">
      <div className="flex items-center justify-between px-4 sm:px-6 py-1.5">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Time and Date */}
          <div className="hidden sm:flex flex-col">
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {formatTime(currentTime)}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {formatDate(currentTime)}
            </p>
          </div>

          {/* Mobile Time */}
          <div className="sm:hidden">
            <h2 className="text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {formatTime(currentTime)}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              {formatDate(currentTime)}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Theme Toggle */}
          {/* <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button> */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-center p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-full transition-all duration-200 transform hover:scale-105"
              >
                <Settings size={20} />
              </button>
          
              {/* Backdrop untuk mobile */}
              {isDropdownOpen && (
                <div 
                  className="fixed inset-0 z-40 md:hidden"
                  onClick={() => setIsDropdownOpen(false)}
                />
              )}
          
              {/* Dropdown Menu */}
              <div className={`absolute right-0 mt-2 transition-all duration-200 transform origin-top-right z-50 ${
                isDropdownOpen 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
              }`}>
                <div className="w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 backdrop-blur-sm">
                  {/* Header */}
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-700">Pengaturan Akun</p>
                  </div>
                  
                  {/* Menu Items */}
                  <div className="py-1">
                    <button
                      onClick={() => { 
                        setIsChangePassOpen(true); 
                        setIsDropdownOpen(false); 
                      }}
                      className="group w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 transition-all duration-200 flex items-center space-x-3"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors">
                        <svg 
                          className="w-4 h-4 text-green-600" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2h-6m6 0v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h2M7 7a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2H9a2 2 0 01-2-2V7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-green-700">
                          Ubah Password
                        </p>
                        <p className="text-xs text-gray-500">
                          Perbarui kata sandi akun Anda
                        </p>
                      </div>
                      <svg 
                        className="w-4 h-4 text-gray-400 group-hover:text-green-500 transform group-hover:translate-x-1 transition-all" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
          
                    {/* Divider */}
                    <div className="my-1 border-t border-gray-100"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Menu */}
          <div className="flex flex-col items-end">
            <p className="text-sm lg:text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 leading-tight">{user?.role?.name}</p>
          </div>

          {/* Logout Button */}
          <button
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-2 sm:px-4 lg:px-6 py-1 sm:py-1.5 rounded text-sm sm:text-base font-medium transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500/20"
            onClick={handleLogout}
          >
            <span className="hidden sm:inline">Logout</span>
            <LogOutIcon className="w-4 h-4 sm:hidden" />
          </button>
        </div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(showUserMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}

    </header>
  );
};

export default NavbarNew;
