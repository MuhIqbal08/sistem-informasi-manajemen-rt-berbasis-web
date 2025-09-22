import React from 'react';
import { Settings, LogOut, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const SidebarNew = ({
  sidebarOpen,
  setSidebarOpen,
  menuItems,
  activeMenu,
  setActiveMenu,
  setCurrentPage,
}) => {
  console.log('activeMenu: ', activeMenu);
  console.log('menuItems: ', menuItems);
  return (
    <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 overflow-y-auto`}>
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="mt-6 px-6">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.to}
              onClick={() => {
                setActiveMenu(item.id);
                // setCurrentPage(1);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 hover:bg-gray-50 ${
                activeMenu === item.id
                  ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-500'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <item.icon
                className={`w-5 h-5 mr-3 ${
                  activeMenu === item.id ? item.color : 'text-gray-500'
                }`}
              />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/*  */}
    </div>
  );
};

export default SidebarNew;
