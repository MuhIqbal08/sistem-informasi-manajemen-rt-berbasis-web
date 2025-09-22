import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import { AlertCircle, BadgeCheck, CircleAlert, Info } from "lucide-react";

// Komponen non-lazy
import Pengurus from "./components/Pengurus";
import LoadingPage from "./components/Loading";
import SuratPengantarForm from "./components/SuratPengantar";
import HomePage from "./pages/users/HomePage";
import PengajuanListPage from "./pages/users/PengajuanListPage";
import GaleriPage from "./pages/users/Galeri";
import GaleriGambarPage from "./pages/users/GaleriGambarPage";
import KeuanganPage from "./pages/users/KeuanganPages";
import Pengumuman from "./pages/users/Pengumuman";
import Agenda from "./pages/users/Agenda";
import PengajuanNew from "./components/PengajuanNew";
import DashboardPage from "./pages/admin/Dashboard";
import AdminLogin from "./components/Admin/LoginAdmin";
import RoleListPage from "./pages/admin/RoleListPages";
// import IuranListWarga from "./components/Admin/Pembayaran/IuranListWarga";
// import IuranCardWarga from "./components/Admin/Pembayaran/IuranCardWarga";
import IuranCardPage from "./pages/admin/IuranCard";
import ResetPassword from "./components/ResetPassword";

// Komponen Lazy
const DaftarPengajuanPage = lazy(() =>
  import("./pages/admin/DaftarPengajuanPage")
);
const UserListPage = lazy(() => import("./pages/admin/UserListPage"));
const PemasukanPages = lazy(() => import("./pages/admin/PemasukanPages"));
const IuranListPage = lazy(() => import("./pages/admin/IuranListPages"));
const PengumumanListPage = lazy(() => import("./pages/admin/PengumumanPages"));
const AgendaListPage = lazy(() => import("./pages/admin/AgendaListPages"));
const GaleriListPage = lazy(() => import("./pages/admin/GaleriListPage"));
const PembayaranListPages = lazy(() =>
  import("./pages/admin/PembayaranListPages")
);
// const RTAdminDashboard = lazy(() => import("./components/Admin"));

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pengurus" element={<Pengurus />} />
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/ertero-admin-login" element={<AdminLogin />} />
          <Route
            path="/admin/list/pengajuan"
            element={
              <Suspense fallback={<LoadingPage />}>
                <DaftarPengajuanPage />
              </Suspense>
            }
          />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/pengajuan/list" element={<PengajuanListPage />} />
          <Route
            path="/surat/:userId/:suratId"
            element={<SuratPengantarForm />}
          />
          <Route
            path="/users/list"
            element={
              <Suspense fallback={<LoadingPage />}>
                <UserListPage />
              </Suspense>
            }
          />
          <Route
            path="/role/list"
            element={
              <Suspense fallback={<LoadingPage />}>
                <RoleListPage />
              </Suspense>
            }
          />
          <Route
            path="/admin/keuangan"
            element={
              <Suspense fallback={<LoadingPage />}>
                <PemasukanPages />
              </Suspense>
            }
          />
          <Route
            path="/iuran"
            element={
              <Suspense fallback={<LoadingPage />}>
                <IuranListPage />
              </Suspense>
            }
          />
          <Route
            path="/iuran/list/"
            element={
              <Suspense fallback={<LoadingPage />}>
                <IuranListPage />
              </Suspense>
            }
          />
          <Route
            path="/iuran/list/:userId"
            element={
              <Suspense fallback={<LoadingPage />}>
                <IuranCardPage />
              </Suspense>
            }
          />
          <Route
            path="/pengumuman"
            element={
              <Suspense fallback={<LoadingPage />}>
                <PengumumanListPage />
              </Suspense>
            }
          />
          <Route
            path="/agenda"
            element={
              <Suspense fallback={<LoadingPage />}>
                <AgendaListPage />
              </Suspense>
            }
          />
          <Route
            path="/galeri/list"
            element={
              <Suspense fallback={<LoadingPage />}>
                <GaleriListPage />
              </Suspense>
            }
          />
          <Route path="/galeri" element={<GaleriPage />} />
          <Route path="/galeri/:uuid" element={<GaleriGambarPage />} />
          <Route path="/keuangan" element={<KeuanganPage />} />
          <Route
            path="/pembayaran"
            element={
              <Suspense fallback={<LoadingPage />}>
                <PembayaranListPages />
              </Suspense>
            }
          />
          <Route path="/agenda/list" element={<Agenda />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/pengumuman/list" element={<Pengumuman />} />
          {/* <Route path="/pengajuan2" element={<PengajuanNew />} /> */}
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        icon={({ type }) => {
          switch (type) {
            case "info":
              return <Info className="w-5 h-5 text-blue-500" />;
            case "error":
              return <CircleAlert className="w-5 h-5 text-red-500" />;
            case "success":
              return <BadgeCheck className="w-5 h-5 text-green-500" />;
            case "warning":
              return <AlertCircle className="w-5 h-5 text-yellow-500" />;
            default:
              return null;
          }
        }}
        toastClassName={({ type }) =>
          type === "success"
            ? "text-gray-900 bg-gradient-to-r from-green-50 to-green-100 border-green-200 flex transform transition-all duration-300 ease-in-out mb-3 border rounded-lg shadow-lg backdrop-blur-sm max-w-md w-full sm:w-96 p-4"
            : type === "error"
            ? "text-gray-900 bg-gradient-to-r from-red-50 to-red-100 border-red-200 flex transform transition-all duration-300 ease-in-out mb-3 border rounded-lg shadow-lg backdrop-blur-sm max-w-md w-full sm:w-96 p-4"
            : type === "info"
            ? "text-gray-900 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 flex transform transition-all duration-300 ease-in-out mb-3 border rounded-lg shadow-lg backdrop-blur-sm max-w-md w-full sm:w-96 p-4"
            : type === "warning"
            ? "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200 flex transform transition-all duration-300 ease-in-out mb-3 border rounded-lg shadow-lg backdrop-blur-sm max-w-md w-full sm:w-96 p-4"
            : "bg-white text-black"
        }
      />
    </>
  );
}

export default App;
