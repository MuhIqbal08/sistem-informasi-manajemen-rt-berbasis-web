import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  ArrowUp,
  ArrowDown,
  Filter,
  Edit,
  Trash2,
  Calendar,
  Search,
  Plus,
} from "lucide-react";
import axios from "axios";
import AddModalKeuangan from "./AddModalKeuangan";
import EditModalKeuangan from "./EditModalKeuangan";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import html2pdf from "html2pdf.js";
axios.defaults.baseURL = "http://localhost:3500";
const Card = ({
  title,
  value,
  previousValue,
  icon: Icon,
  color,
  isSaldo,
  isKas,
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateChange = () => {
    if (!previousValue || previousValue === 0) return null;
    const change = ((value - previousValue) / previousValue) * 100;
    return {
      percentage: Math.abs(change).toFixed(1),
      isPositive: change > 0,
      isNegative: change < 0,
    };
  };

  const change = calculateChange();

  const getColorClasses = () => {
    switch (color) {
      case "green":
        return {
          bg: "from-emerald-500 to-green-600",
          icon: "text-emerald-100",
          accent: "bg-emerald-400/20",
        };
      case "red":
        return {
          bg: "from-red-500 to-rose-600",
          icon: "text-red-100",
          accent: "bg-red-400/20",
        };
      case "blue":
        return {
          bg: "from-blue-500 to-indigo-600",
          icon: "text-blue-100",
          accent: "bg-blue-400/20",
        };
      case "purple":
        return {
          bg: "from-purple-500 to-violet-600",
          icon: "text-purple-100",
          accent: "bg-purple-400/20",
        };
      default:
        return {
          bg: "from-gray-500 to-slate-600",
          icon: "text-gray-100",
          accent: "bg-gray-400/20",
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-90`}
      ></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8 opacity-10">
        <div className="w-full h-full rounded-full bg-white"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-20 h-20 transform -translate-x-4 translate-y-4 opacity-10">
        <div className="w-full h-full rounded-full bg-white"></div>
      </div>

      {/* Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${colors.accent} backdrop-blur-sm`}>
            <Icon className={`w-6 h-6 ${colors.icon}`} />
          </div>
          {change && (
            <div
              className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                change.isPositive
                  ? "bg-green-400/20 text-green-100"
                  : change.isNegative
                  ? "bg-red-400/20 text-red-100"
                  : "bg-gray-400/20 text-gray-100"
              }`}
            >
              {change.isPositive && <ArrowUp className="w-3 h-3 mr-1" />}
              {change.isNegative && <ArrowDown className="w-3 h-3 mr-1" />}
              {change.percentage}%
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-white/80 text-sm font-medium mb-2 tracking-wide">
          {title}
        </h3>

        {/* Main Value */}
        <div className="mb-4">
          <p className="text-white text-2xl md:text-3xl font-bold tracking-tight">
            {formatCurrency(value)}
          </p>
        </div>

        {/* Previous Month Comparison */}
        {previousValue !== undefined && (
          <div className="border-t border-white/20 pt-3">
            <div className="flex items-center justify-between text-white/70 text-xs">
              <span>Bulan Lalu:</span>
              <span className="font-medium">
                {formatCurrency(previousValue)}
              </span>
            </div>
            {change && (
              <div className="mt-1 text-white/60 text-xs">
                {change.isPositive && !isSaldo && !isKas && "↗ Naik"}
                {change.isNegative && !isSaldo && !isKas && "↘ Turun"}
                {change.isPositive && (isSaldo || isKas) && "↗ Bertambah"}
                {change.isNegative && (isSaldo || isKas) && "↘ Berkurang"}
                {change.percentage === "0.0" && "→ Tidak berubah"}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

const KeuanganDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionSearch, setTransactionSearch] = useState([]);
  const [transactionsByMonth, setTransactionsByMonth] = useState([]);
  const [activeTab, setActiveTab] = useState("semua");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [transactionsId, setTransactionsId] = useState("");
  const [totalPemasukkanData, setTotalPemasukkanData] = useState(0);
  const [totalPengeluaranData, setTotalPengeluaranData] = useState(0);
  const [totalPemasukkanBulanSebelumnya, setTotalPemasukkanBulanSebelumnya] =
    useState(0);
  const [totalPengeluaranBulanSebelumnya, setTotalPengeluaranBulanSebelumnya] =
    useState(0);
  // const [saldoBersihSebelumnya, setSaldoBersihSebelumnya] = useState(0);
  const [totalKas, setTotalKas] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    type: "pemasukan",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const getTransactions = async (page = 1) => {
    try {
      const params = {
        page,
        limit: 5,
      };

      if (searchTerm) params.search = searchTerm;
      if (filterDate) {
        const [year, month] = filterDate.split("-");
        params.tahun = year;
        params.bulan = month;
      }
      if (activeTab !== "semua") params.type = activeTab;

      const response = await axios.get("/transaksi", { params });
      setTransactions(response.data.data);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    getTransactions(currentPage);
  }, [searchTerm, filterDate, activeTab, currentPage]);

  useEffect(() => {
    getAmountByMonth();
  }, []);

  const getAmountByMonth = async () => {
    try {
      const pemasukkanResponse = await axios.get(
        `/transaksi/total/bulanan?type=pemasukan`
      );
      setTotalPemasukkanData(pemasukkanResponse.data.totalBulanIni);
      const pengeluaranResponse = await axios.get(
        `/transaksi/total/bulanan?type=pengeluaran`
      );
      setTotalPengeluaranData(pengeluaranResponse.data.totalBulanIni);
      const pemasukanBulanSebelumnya =
        pemasukkanResponse?.data?.perBulan[1]?.total || 0;
      setTotalPemasukkanBulanSebelumnya(pemasukanBulanSebelumnya);
      console.log("test", pemasukkanResponse, pengeluaranResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const saldoBersihData = totalPemasukkanData - totalPengeluaranData;
  const saldoBersihSebelumnya =
    totalPemasukkanBulanSebelumnya - totalPengeluaranBulanSebelumnya;

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesTab = activeTab === "semua" || transaction.type === activeTab;
    const matchesSearch = transaction.category
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesDate =
      !filterDate || transaction.date.slice(0, 7) === filterDate; // cocokkan YYYY-MM

    return matchesTab && matchesSearch && matchesDate;
  });

  // const displayedUsers = searchTerm ? filteredUsers : users;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDelete = (id) => {
    toast.warning(
      ({ closeToast }) => (
        <div className="space-y-2">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-900 mb-1">
              Konfirmasi
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {`Apakah Anda yakin ingin menghapus transaksi ini? 
            Tindakan ini tidak dapat dibatalkan.`}
            </p>
          </div>
          <div className="flex space-x-2 mt-3">
            <button
              onClick={async () => {
                try {
                  await axios.delete(`/transaksi/${id}`);
                  await getTransactions(currentPage);
                  getAmountByMonth();
                  toast.dismiss();
                  toast.success("Transaksi berhasil dihapus!");
                } catch (error) {
                  toast.dismiss();
                  toast.error("Gagal menghapus transaksi.");
                }
              }}
              className="px-3 py-1 text-xs font-medium rounded-md transition-colors bg-blue-600 text-white hover:bg-blue-700"
            >
              Ya
            </button>
            <button
              onClick={() => toast.dismiss()}
              className="px-3 py-1 text-xs font-medium rounded-md transition-colors bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Batal
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  const closeModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      getTransactions(page);
    }
  };

  const handleDownloadLaporan = () => {
    // Filter transaksi berdasarkan bulan yang dipilih
    const filtered = filteredTransactions;

    if (filtered.length === 0) {
      toast.warning("Tidak ada data untuk bulan tersebut!");
      return;
    }

    // Buat HTML untuk laporan
    const laporanHTML = `
  <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.5;">
    <h1 style="text-align:center; color:#2c3e50; margin-bottom: 5px;">Laporan Keuangan</h1>
    <p style="text-align:center; font-size:14px; margin-top:0; color:#555;">
      Bulan: ${
        filterDate
          ? new Date(filterDate).toLocaleString("id-ID", {
              month: "long",
              year: "numeric",
            })
          : "Semua"
      }
    </p>
    <table border="1" cellspacing="0" cellpadding="8" style="width:100%; border-collapse:collapse; font-size:13px;">
      <thead>
        <tr style="background:#34495e; color:white;">
          <th style="text-align:center;">Tanggal</th>
          <th style="text-align:center;">Kategori</th>
          <th style="text-align:center;">Tipe</th>
          <th style="text-align:right;">Jumlah</th>
        </tr>
      </thead>
      <tbody>
        ${filtered
          .map(
            (t) => `
          <tr>
            <td style="text-align:center;">${formatDate(t.date)}</td>
            <td style="text-align:center;">${t.category}</td>
            <td style="text-align:center;">${t.type}</td>
            <td style="text-align:right;">${formatCurrency(t.amount)}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
    <div style="margin-top:20px; font-size:14px;">
      <p><strong>Total Pemasukan:</strong> ${formatCurrency(
        filtered
          .filter((f) => f.type === "pemasukan")
          .reduce((a, b) => a + b.amount, 0)
      )}</p>
      <p><strong>Total Pengeluaran:</strong> ${formatCurrency(
        filtered
          .filter((f) => f.type === "pengeluaran")
          .reduce((a, b) => a + b.amount, 0)
      )}</p>
      <p><strong>Saldo Bersih:</strong> ${formatCurrency(
        filtered
          .filter((f) => f.type === "pemasukan")
          .reduce((a, b) => a + b.amount, 0) -
          filtered
            .filter((f) => f.type === "pengeluaran")
            .reduce((a, b) => a + b.amount, 0)
      )}</p>
    </div>
    <hr style="margin-top:30px; border: none; border-top: 1px solid #ccc;"/>
    <p style="font-size:12px; color:#888; text-align:right;">
      Dicetak pada ${new Date().toLocaleString("id-ID", {
        dateStyle: "long",
        timeStyle: "short",
      })}
    </p>
  </div>
`;

    const opt = {
      margin: 0.5,
      filename: `Laporan_Keuangan_${filterDate || "Semua"}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().from(laporanHTML).set(opt).save();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-2 md:gap-0 md:flex-row justify-between items-center py-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Dashboard Keuangan
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Kelola pemasukan dan pengeluaran bisnis Anda
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="w-full md:w-auto justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Tambah Transaksi
              </button>
            </div>
          </div>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 z-40">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={closeModal}
            ></div>
            <AddModalKeuangan
              closeModal={closeModal}
              onUpdate={() => {
                getTransactions(currentPage);
                getAmountByMonth();
              }}
            />
          </div>
        )}

        {showEditModal && (
          <div className="fixed inset-0 z-40">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={closeModal}
            ></div>
            <EditModalKeuangan
              closeModal={closeModal}
              transactionId={transactionsId}
              onUpdate={() => {
                getTransactions(currentPage);
                getAmountByMonth();
              }}
            />
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-8">
          <Card
            title="Total Pemasukan Bulan Ini"
            value={totalPemasukkanData}
            previousValue={totalPemasukkanBulanSebelumnya}
            icon={TrendingUp}
            color="green"
          />
          <Card
            title="Total Pengeluaran Bulan Ini"
            value={totalPengeluaranData}
            previousValue={totalPengeluaranBulanSebelumnya}
            icon={TrendingDown}
            color="red"
          />
          <Card
            title="Saldo Bersih Bulan Ini"
            value={saldoBersihData}
            previousValue={saldoBersihSebelumnya}
            icon={DollarSign}
            color="blue"
            isSaldo
          />
          {/* <Card 
            title="Total Kas" 
            value={currentMonth.totalKas}
            previousValue={previousMonth.totalKas}
            icon={Wallet} 
            color="purple" 
            isKas 
          /> */}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* kategori */}
            <div className="flex w-full items-center bg-gray-100 p-1 rounded-xl">
              {["semua", "pemasukan", "pengeluaran"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 md:px-6 md:py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
                    activeTab === tab
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-3 w-full">
              {/* Search */}
              <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari transaksi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filter Date */}
              <div className="relative lg:w-auto">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="month"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Tombol Download */}
              <button
                onClick={handleDownloadLaporan}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2"
              >
                Download Laporan
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Tanggal", "Kategori", "Tipe", "Jumlah", "Aksi"].map(
                    (title) => (
                      <th
                        key={title}
                        className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {title}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <Filter className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium">
                          Tidak ada transaksi ditemukan
                        </p>
                        <p className="text-sm">
                          Coba ubah filter atau tambah transaksi baru
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
                          {transaction.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap capitalize">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            transaction.type === "pemasukan"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <span
                          className={
                            transaction.type === "pemasukan"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {transaction.type === "pemasukan" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user &&
                        (user?.role?.name === "admin" ||
                          user?.role?.name === "Bendahara") ? (
                          <>
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setShowEditModal(true);
                                  setTransactionsId(transaction.transactionId);
                                }}
                                className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  handleDelete(transaction.transactionId)
                                }
                                className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <nav className="flex justify-end items-center py-4 px-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Menampilkan halaman {currentPage} dari {totalPages}
              </span>
              <ul className="inline-flex -space-x-px text-sm h-8">
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 h-8 border rounded-l-lg hover:bg-gray-100 disabled:opacity-50"
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <li key={page}>
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`px-3 h-8 border ${
                          currentPage === page
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {page}
                      </button>
                    </li>
                  )
                )}
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 h-8 border rounded-r-lg hover:bg-gray-100 disabled:opacity-50"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Additional Info */}
        {/* <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Ringkasan Perbandingan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-4 bg-emerald-50 rounded-xl">
              <div className="text-emerald-600 font-semibold">Pemasukan</div>
              <div className="text-emerald-800 mt-1">
                +{((currentMonth.totalPemasukan - previousMonth.totalPemasukan) / previousMonth.totalPemasukan * 100).toFixed(1)}%
              </div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-xl">
              <div className="text-red-600 font-semibold">Pengeluaran</div>
              <div className="text-red-800 mt-1">
                {currentMonth.totalPengeluaran > previousMonth.totalPengeluaran ? '+' : ''}
                {((currentMonth.totalPengeluaran - previousMonth.totalPengeluaran) / previousMonth.totalPengeluaran * 100).toFixed(1)}%
              </div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-blue-600 font-semibold">Saldo Bersih</div>
              <div className="text-blue-800 mt-1">
                +{((currentMonth.saldoBersih - previousMonth.saldoBersih) / previousMonth.saldoBersih * 100).toFixed(1)}%
              </div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-purple-600 font-semibold">Total Kas</div>
              <div className="text-purple-800 mt-1">
                +{((currentMonth.totalKas - previousMonth.totalKas) / previousMonth.totalKas * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default KeuanganDashboard;
