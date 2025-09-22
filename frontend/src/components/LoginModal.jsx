import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";
import { Eye, EyeOff, X } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const LoginModal = ({ isLoginOpen, setIsLoginOpen }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, isError, msg } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(login({ username, password })).unwrap();
      // Kalau berhasil
      if (result.roleId !== 7) {
        toast.error("Akun anda tidak ada");
        return;
      }
      toast.success("Login berhasil");
      setIsLoginOpen(false);
    } catch (errorMsg) {
      // Kalau gagal
      toast.error(errorMsg);
      // Jangan tutup modal
    }
  };

  // console.log(isError)

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isLoginOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white rounded-2xl p-8 w-full max-w-md mx-4 transform transition-all duration-300 ${
          isLoginOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <button
            onClick={() => setIsLoginOpen(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              placeholder="Masukkan username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all pr-12"
                placeholder="Masukkan password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {/* <div>
            <Link
    to={"/reset-password"}
  onClick={() => {
    setIsLoginOpen(false);
  }}
  className="text-sm text-green-600 cursor-pointer hover:underline mt-2 text-center"
>
  Lupa password?
</Link>
          </div> */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
