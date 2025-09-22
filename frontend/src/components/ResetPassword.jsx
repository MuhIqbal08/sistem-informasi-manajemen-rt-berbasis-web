// Masih tahap uji coba, karena butuh OTP
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3500/users/reset-password", { username });
      toast.success(res.data.msg);
      setUsername("");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Terjadi kesalahan");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-600 via-green-600 to-teal-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg animate-bounce"></div>
      <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-white/5 rounded-full blur-lg animate-bounce delay-500"></div>

      {/* Back button */}
      <Link
    //   to={"/"}
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 group"
      >
        <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-200">
          <ArrowLeft size={20} />
        </div>
        <span className="font-medium hidden sm:inline">Kembali</span>
      </Link>

      {/* Main content */}
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h1>
            <p className="text-gray-600">Masukkan username anda untuk menerima password baru</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div className="relative">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Masukkan username Anda"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
                required
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none mt-8">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            <button
              onClick={handleReset}
              disabled={!username.trim()}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Reset Password
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
              <Link
            //   to={"/"}
                onClick={() => navigate(-1)}
                className="text-green-600 hover:text-green-700 font-medium hover:underline transition-colors duration-200"
              >
                Kembali ke home
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
