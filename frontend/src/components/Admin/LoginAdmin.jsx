import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Users, Home, Shield, MapPin, Phone, Calendar, Award, FileText, Megaphone, Image, DollarSign, Wallet, LayoutDashboard } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/authSlice';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, isSuccess } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch();


  const handleLogin = async(e) => {
    e.preventDefault();
  
    try {
      const result = await dispatch(login({ username, password })).unwrap();
      if (result.role === 'warga') {
        toast.error('Akun anda tidak ada');
          return;
      }
      toast.success("Login berhasil");
      // setIsLoginOpen(false);
    } catch (errorMsg) {
      // Kalau gagal
      toast.error(errorMsg);
      // Jangan tutup modal
    }
  };

  useEffect(() => {
        if (user || isSuccess) {
          if (user.roleGroup === "admin" || user.roleGroup === "pengurus") {
            navigate("/admin");
          }
        }
      }, [user, isSuccess, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Illustration & Info */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full"></div>
          <div className="absolute top-60 -right-32 w-64 h-64 bg-white/5 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-white/10 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col  px-12 py-16 text-white">
          {/* Logo & Title */}
          <div className="mb-8">
            <div className='flex items-center gap-4'>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Home className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Ertero Dashboard</h1>
            </div>
            <p className="text-xl text-blue-100 leading-relaxed">
              Platform terintegrasi untuk mengelola administrasi dan kegiatan rukun tetangga dengan mudah dan efisien
            </p>
          </div>

          {/* Features */}
          <div className="space-y-6">
      {/* Dashboard & Data Warga */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <LayoutDashboard className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">Dashboard & Data Warga</h3>
          <p className="text-blue-100">Pantau statistik dan kelola informasi warga secara menyeluruh</p>
        </div>
      </div>

      {/* Keuangan & Iuran Kas */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <Wallet className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">Keuangan & Iuran Kas</h3>
          <p className="text-blue-100">Kelola pemasukan, pengeluaran, dan pembayaran kas warga</p>
        </div>
      </div>

      {/* Agenda & Pengumuman */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">Agenda & Pengumuman</h3>
          <p className="text-blue-100">Atur jadwal kegiatan dan sampaikan informasi kepada warga</p>
        </div>
      </div>

      {/* Galeri & Pengajuan Surat */}
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">Galeri & Pengajuan Surat</h3>
          <p className="text-blue-100">Dokumentasikan kegiatan & kelola surat pengantar online</p>
        </div>
      </div>
    </div>

          {/* Stats */}
          {/* <div className="mt-12 pt-8 border-t border-white/20">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-blue-100">Warga Terdaftar</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm text-blue-100">RT Aktif</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">99%</div>
                <div className="text-sm text-blue-100">Uptime</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className='flex items-center justify-center gap-4 mb-2'>
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full shadow-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Admin RT</h1>
            </div>
            <p className="text-gray-600">Sistem Informasi Rukun Tetangga</p>
          </div>

          {/* Login Header */}
          <div className="sm:block hidden text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang</h2>
            <p className="text-gray-600">Silakan masuk ke dashboard admin</p>
          </div>

          {/* Login Form */}
          <form className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100" onSubmit={handleLogin}>
            <div className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Masukkan Username"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Masukkan password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {/* <div>
                  <Link
                      to={"/reset-password"}
                    // onClick={() => {
                    //   setIsLoginOpen(false);
                    // }}
                    className="text-sm text-blue-600 cursor-pointer hover:underline mt-2 text-center"
                  >
                    Lupa password?
                  </Link>
                </div> */}
              </div>

              {/* Remember Me & Forgot Password */}
              {/* <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
                </label>
                <button className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                  Lupa password?
                </button>
              </div> */}

              {/* Submit Button */}
              <button
                type="submit"
                // onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Masuk...</span>
                  </div>
                ) : (
                  'Masuk ke Dashboard'
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="my-3 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">atau</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Contact Info */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">Butuh bantuan akses?</p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>0812-9335-9816</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>RT 002/022</span>
                </div>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>© 2025 Sistem RT Ertero Digital</p>
            {/* <p className="mt-1">Membangun komunitas yang lebih baik</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}