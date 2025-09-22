import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SidebarNew from "../../components/Admin/Sidebar/SidebarNew";
import NavbarNew from "../../components/Admin/Navbar/NavbarNew";
import {
  Calendar,
  DollarSign,
  FileText,
  LayoutDashboard,
  Megaphone,
  Users,
  Wallet,
  Image,
  UserCog,
} from "lucide-react";
import { useSelector } from "react-redux";
import ChangePasswordModalAdmin from "../../components/Admin/ChangePasswordModalAdmin";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      color: "text-blue-500",
      to: "/admin",
    },
    ...(user &&
    (user.roleGroup === "admin" ||
      user?.role?.name === "Ketua RT" ||
      user?.role?.name === "Wakil Ketua RT" ||
      user?.role?.name === "Sekretaris")
      ? [
          {
            id: "users",
            label: "Users",
            icon: Users,
            color: "text-cyan-500",
            to: "/users/list",
          },
        ]
      : []),
    ...(user && user?.roleGroup === "admin"
      ? [
          {
            id: "roles",
            label: "Role",
            icon: UserCog,
            color: "text-cyan-500",
            to: "/role/list",
          },
        ]
      : []),
    ...(user &&
    (user.roleGroup === "admin" ||
      user?.role?.name === "Ketua RT" ||
      user?.role?.name === "Wakil Ketua RT" ||
      user?.role?.name === "Bendahara")
      ? [
          {
            id: "keuangan",
            label: "Keuangan",
            icon: DollarSign,
            color: "text-green-500",
            to: "/admin/keuangan",
          },
        ]
      : []),
    ...(user &&
    (user.roleGroup === "admin" ||
      user?.role?.name === "Ketua RT" ||
      user?.role?.name === "Wakil Ketua RT" ||
      user?.role?.name === "Bendahara")
      ? [
          {
            id: "iuran",
            label: "Iuran Kas",
            icon: Wallet,
            color: "text-emerald-500",
            to: "/pembayaran",
          },
        ]
      : []),
    {
      id: "agenda",
      label: "Agenda",
      icon: Calendar,
      color: "text-purple-500",
      to: "/agenda",
    },
    {
      id: "pengumuman",
      label: "Pengumuman",
      icon: Megaphone,
      color: "text-orange-500",
      to: "/pengumuman",
    },
    {
      id: "galeri",
      label: "Galeri",
      icon: Image,
      color: "text-red-500",
      to: "/galeri/list",
    },
    ...(user &&
    (user.roleGroup === "admin" ||
      user?.role?.name === "Ketua RT" ||
      user?.role?.name === "Wakil Ketua RT")
      ? [
          {
            id: "pengajuan",
            label: "Pengajuan",
            icon: FileText,
            color: "text-indigo-500",
            to: "/admin/list/pengajuan",
          },
        ]
      : []),
  ];

  // Ambil dari localStorage jika ada
  const initialActive = localStorage.getItem("activeMenu") || "dashboard";
  const [activeMenu, setActiveMenu] = useState(initialActive);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isChangePassOpen, setIsChangePassOpen] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname;

    let matchedItem = menuItems.find((item) => item.to === currentPath);

    if (!matchedItem) {
      matchedItem = menuItems
        .filter((item) => currentPath.startsWith(item.to))
        .sort((a, b) => b.to.length - a.to.length)[0];
    }

    if (matchedItem) {
      setActiveMenu(matchedItem.id);
      localStorage.setItem("activeMenu", matchedItem.id);
    }
  }, [location.pathname]);

  return (
    <React.Fragment>
      <div className="flex h-screen bg-gray-100">
        <SidebarNew
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          menuItems={menuItems}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          setCurrentPage={setCurrentPage}
        />

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          <NavbarNew
            setSidebarOpen={setSidebarOpen}
            menuItems={menuItems}
            activeMenu={activeMenu}
            setIsChangePassOpen={setIsChangePassOpen}
          />
          {isChangePassOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
              <ChangePasswordModalAdmin
                isOpen={true}
                setIsOpen={setIsChangePassOpen}
              />
            </div>
          )}
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
