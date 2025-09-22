import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { useSelector } from "react-redux";

const ChangePasswordModalAdmin = ({ isOpen, setIsOpen }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Password baru dan konfirmasi tidak sama");
      return;
    }

    try {
      await axios.put(`http://localhost:3500/users/ubah-password/${user.uuid}`, {
        currentPassword,
        newPassword
      });

      toast.success("Password berhasil diubah");
      setIsOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Gagal mengubah password");
    }
  };

  if (!isOpen) return null;

  return (
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4">Ubah Password</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Password Lama</label>
            <input
              type={showPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password Baru</label>
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Konfirmasi Password Baru</label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <span className="text-sm text-gray-600">Tampilkan password</span>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all"
          >
            Ubah Password
          </button>
        </form>
      </div>
  );
};

export default ChangePasswordModalAdmin;