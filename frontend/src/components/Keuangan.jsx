import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModalBayarKas from "./ModalBayarKas";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Calendar,
  Check,
  DollarSign,
  Filter,
  Plus,
  Search,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import api from "../api/api";

const KeuanganUser = () => {
  const [year, setYear] = useState([]);
  const [paymentYear, setPaymentYear] = useState();
  const [totalPemasukkanData, setTotalPemasukkanData] = useState(0);
  const [totalPengeluaranData, setTotalPengeluaranData] = useState(0);
  const [totalPemasukkanBulanSebelumnya, setTotalPemasukkanBulanSebelumnya] =
    useState(0);
  const [totalPengeluaranBulanSebelumnya, setTotalPengeluaranBulanSebelumnya] =
    useState(0);
  const [monthList, setMonthList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getAmountByMonth();
  }, []);

  const getAmountByMonth = async () => {
    try {
      const pemasukkanResponse = await axios.get(
        `${api}/transaksi/total/bulanan?type=pemasukan`
      );
      setTotalPemasukkanData(pemasukkanResponse.data.totalBulanIni);
      console.log("test", pemasukkanResponse);
      const pengeluaranResponse = await axios.get(
        `${api}/transaksi/total/bulanan?type=pengeluaran`
      );
      setTotalPengeluaranData(pengeluaranResponse.data.totalBulanIni);
      const pemasukanBulanSebelumnya =
        pemasukkanResponse?.data?.perBulan[1]?.total || 0;
      setTotalPemasukkanBulanSebelumnya(pemasukanBulanSebelumnya);
      const pengeluaranBulanSebelumnya =
        pengeluaranResponse?.data?.perBulan[1]?.total || 0;
      setTotalPengeluaranBulanSebelumnya(pengeluaranBulanSebelumnya);
    } catch (error) {
      console.log(error);
    }
  };

  const saldoBersihData = totalPemasukkanData - totalPengeluaranData;

  useEffect(() => {
    const getKasYear = async () => {
      try {
        const getYear = await axios.get("http://localhost:3500/kasyear");
        // const years = getYear.data
        setYear(getYear.data);
        console.log("getyear", getYear.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getKasYear();
  }, []);

  useEffect(() => {
    if (year.length > 0 && !paymentYear) {
      setPaymentYear(year[0].uuid); // default pilih tahun pertama
    }
  }, [year]);
  // console.log('user', user)
  useEffect(() => {
    const getKasMonthByUserId = async () => {
      // if (!user?.uuid || !paymentYear) return;
      try {
        // console.log('userId: ', user.uuid)
        console.log("paymentYear: ", paymentYear);
        const response = await axios.get(
          `http://localhost:3500/kasyear/${user.uuid}/${paymentYear}`
        );
        console.log("monthList:", response.data);
        setMonthList(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getKasMonthByUserId();
  }, [user, paymentYear]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl">
              <DollarSign className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Keuangan RT
              </h1>
              <p className="text-gray-600 text-sm md:text-base">
                Dashboard pemasukkan, pengeluaran, dan status iuran warga
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl group-hover:scale-110 transition-transform">
                <TrendingUp className="text-white" size={24} />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                Pemasukan
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Total Pemasukan
            </h3>
            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 inline-block text-transparent bg-clip-text">
              Rp {totalPemasukkanData.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl group-hover:scale-110 transition-transform">
                <TrendingDown className="text-white" size={24} />
              </div>
              <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">
                Pengeluaran
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Total Pengeluaran
            </h3>
            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-500 inline-block text-transparent bg-clip-text">
              Rp {totalPengeluaranData.toLocaleString("id-ID")}
            </p>
          </div>

          <div className="group bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl group-hover:scale-110 transition-transform">
                <DollarSign className="text-white" size={24} />
              </div>
              <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                Saldo
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Saldo Tersedia
            </h3>
            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 inline-block text-transparent bg-clip-text">
              Rp {saldoBersihData.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-white/20 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={() => {
                  if (paymentYear) {
                    setShowModal(true);
                  } else {
                    alert("Pilih tahun terlebih dahulu!");
                  }
                }}
              >
                <Plus size={18} />
                Bayar Iuran
              </button>

              <select
                className="bg-white border-2 border-gray-200 text-gray-900 text-sm rounded-xl py-3 px-4 min-w-[120px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                onChange={(e) => setPaymentYear(e.target.value)}
                value={paymentYear}
              >
                {year.map((y) => (
                  <option key={y.uuid} value={y.uuid}>
                    {y.year}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="flex gap-2">
              <button
                onClick={() => setSelectedView('table')}
                className={`p-2 rounded-lg transition-colors ${
                  selectedView === 'table' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Filter size={18} />
              </button>
              <button className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                <Search size={18} />
              </button>
            </div> */}
          </div>
        </div>

        {/* Payment Status Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
              Status Iuran Anda
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Bulan
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Tanggal Bayar
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Kas
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Sampah
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Security
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Tawaf
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Tambahan
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-4 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {monthList.map((month, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-blue-50/50 transition-colors ${
                      month.status === "Sudah ACC"
                        ? "bg-green-50/30"
                        : "bg-white/50"
                    }`}
                  >
                    <td className="px-4 py-4 font-medium text-gray-900">
                      {month.month}
                    </td>
                    <td className="px-4 py-4 text-gray-600">
                      {month.status === "Sudah ACC" ? (
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={14} />
                          {month.tanggalPembayaran}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center text-sm">
                      {month.status === "Sudah ACC" ? (
                        <span className="font-medium">11.000</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center text-sm">
                      {month.status === "Sudah ACC" ? (
                        <span className="font-medium">34.000</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center text-sm">
                      {month.status === "Sudah ACC" ? (
                        <span className="font-medium">10.000</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center text-sm">
                      {month.status === "Sudah ACC" ? (
                        <span className="font-medium">5.000</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center text-sm">
                      {month.status === "Sudah ACC" ? (
                        <span className="font-medium">10.000</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {month.status === "Sudah ACC" ? (
                        <span className="font-bold text-green-600">70.000</span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      {month.status === "Sudah ACC" ? (
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full">
                          <Check size={16} />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-400 rounded-full">
                          <X size={16} />
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <ModalBayarKas
              year={paymentYear}
              closeModal={() => setShowModal(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default KeuanganUser;
