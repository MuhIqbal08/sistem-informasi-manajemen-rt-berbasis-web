import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login, LogOut, reset } from "../features/authSlice";
import {
  Bell,
  Calendar,
  DollarSign,
  Eye,
  EyeOff,
  FileText,
  HomeIcon,
  Image,
  Leaf,
  LogIn,
  LogOut as LogoutIcon,
  Menu,
  Newspaper,
  Settings,
  SquareUserRound,
  X,
} from "lucide-react";
import LoginModal from "./LoginModal";
import ChangePasswordModal from "./ChangePasswordModal";
const Logo = require("../assets/ertero-removebg-preview.png");

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChangePassOpen, setIsChangePassOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const { user, isSuccess } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    // Menentukan tab aktif berdasarkan URL path
    if (location.pathname.startsWith("/agenda")) setActiveTab("agenda");
    else if (location.pathname.startsWith("/pengurus"))
      setActiveTab("pengurus");
    else if (location.pathname.startsWith("/pengumuman"))
      setActiveTab("announcements");
    else if (location.pathname.startsWith("/berita")) setActiveTab("news");
    else if (location.pathname.startsWith("/galeri")) setActiveTab("gallery");
    else if (location.pathname.startsWith("/keuangan")) setActiveTab("finance");
    else if (location.pathname.startsWith("/pengajuan/list"))
      setActiveTab("pengajuan");
    else setActiveTab("home");
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  const menuItems = [
    { id: "home", label: "Beranda", icon: HomeIcon, link: "/" },
    {
      id: "pengurus",
      label: "Pengurus",
      icon: SquareUserRound,
      link: "/pengurus",
    },
    { id: "agenda", label: "Agenda", icon: Calendar, link: "/agenda/list" },
    {
      id: "announcements",
      label: "Pengumuman",
      icon: Bell,
      link: "/pengumuman/list",
    },
    // { id: 'news', label: 'Berita', icon: Newspaper, link: '/berita/list' },
    { id: "gallery", label: "Galeri", icon: Image, link: "/galeri" },
    ...(user && user.roleId === 7
      ? [
          {
            id: "finance",
            label: "Keuangan",
            icon: DollarSign,
            link: "/keuangan",
          },
        ]
      : []),
    ...(user && user.roleId === 7
      ? [
          {
            id: "pengajuan",
            label: "Pengajuan",
            icon: FileText,
            link: "/pengajuan/list",
          },
        ]
      : []),
  ];

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 via-blue-500 to-green-600 text-transparent bg-clip-text bg-[length:200%_200%] animate-gradient-x">
                ERTERO
              </span>
            </div>

            <div className="hidden md:flex space-x-1">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.link}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-green-600 text-white shadow-lg transform scale-105"
                        : "text-gray-600 hover:bg-gray-100 hover:text-green-600"
                    }`}
                  >
                    <IconComponent size={16} /> {/* icon disesuaikan */}
                    <span className="font-medium text-sm">
                      {item.label}
                    </span>{" "}
                    {/* teks kecil */}
                  </Link>
                );
              })}
            </div>

            <div className="flex gap-1">
              {/* Ubah Password - Modern Dropdown */}
              {user && user.roleId === 7 && (
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
                  <div
                    className={`absolute right-0 mt-2 transition-all duration-200 transform origin-top-right z-50 ${
                      isDropdownOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 backdrop-blur-sm">
                      {/* Header */}
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-700">
                          Pengaturan Akun
                        </p>
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
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2h-6m6 0v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9a2 2 0 012-2h2M7 7a2 2 0 012-2h6a2 2 0 012 2v2a2 2 0 01-2 2H9a2 2 0 01-2-2V7z"
                              />
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
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>

                        {/* Divider */}
                        <div className="my-1 border-t border-gray-100"></div>
                      </div>

                      {/* Footer */}
                      {/* <div className="px-4 py-2 border-t border-gray-100 mt-1">
          <p className="text-xs text-gray-400 text-center">
            Klik di luar untuk menutup
          </p>
        </div> */}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center space-x-4">
                {user && user.roleId === 7 ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center bg-rose-600 space-x-2 font-semibold text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-all duration-200 transform hover:scale-105"
                  >
                    <LogoutIcon size={18} />
                    <span className="hidden sm:block">Logout</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
                  >
                    <LogIn size={18} />
                    <span className="hidden sm:block">Login</span>
                  </button>
                )}

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden text-gray-600 hover:text-green-600 transition-colors"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          <LoginModal
            isLoginOpen={isLoginOpen}
            setIsLoginOpen={setIsLoginOpen}
          />

          {/* Mobile Menu */}
          <div
            className={`md:hidden transition-all duration-300 overflow-hidden ${
              isMenuOpen ? "max-h-96 pb-4" : "max-h-0"
            }`}
          >
            <div className="space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.id}
                    to={item.link}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-green-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <IconComponent size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <ChangePasswordModal
          isOpen={isChangePassOpen}
          setIsOpen={setIsChangePassOpen}
        />
      </nav>
    </>
  );
};

export default Navbar;
