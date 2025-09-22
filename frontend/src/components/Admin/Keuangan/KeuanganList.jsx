import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Search,
  Filter,
} from "lucide-react";
import KeuanganModal from "./KeuanganModal";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3500";

const KeuanganDashboard2 = () => {
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState("semua");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [totalPemasukkanData, setTotalPemasukkanData] = useState( []);
  const [totalPengeluaranData, setTotalPengeluaranData] = useState( []);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [formData, setFormData] = useState({
    type: "pemasukan",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const getTransactions = async () => {
    try {
      const response = await axios.get("/transaksi");
      setTransactions(response.data.data);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  useEffect(() => {
    const getAmountByMonth = async() => {
      try {
        const pemasukkanResponse = await axios.get(`/transaksi/total/bulanan?type=pemasukan`);
        // setTotalPemasukkan(pemasukkanResponse.data);

        console.log('test', pemasukkanResponse);
        // setTotalPengeluaran(pengeluaranResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAmountByMonth();
  }, []);

  const totalPemasukan = transactions
    .filter((t) => t.type === "pemasukan")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPengeluaran = transactions
    .filter((t) => t.type === "pengeluaran")
    .reduce((sum, t) => sum + t.amount, 0);

  const saldoBersih = totalPemasukan - totalPengeluaran;

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesTab = activeTab === "semua" || transaction.type === activeTab;
    const matchesSearch =
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !filterDate || transaction.date === filterDate;
    return matchesTab && matchesSearch && matchesDate;
  });

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

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    try {
      if (editingItem) {
        await axios.put(`/transactions/${editingItem.id}`, {
          ...formData,
          amount: parseFloat(formData.amount),
        });
      } else {
        await axios.post("/transactions", {
          ...formData,
          amount: parseFloat(formData.amount),
        });
      }
      await getTransactions();
      closeModal();
    } catch (error) {
      console.error("Gagal menyimpan transaksi:", error);
    }
  };

  const handleEdit = (transaction) => {
    setEditingItem(transaction);
    setFormData({
      type: transaction.type,
      amount: transaction.amount.toString(),
      category: transaction.category,
      date: transaction.date,
    });
    setShowAddModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
      try {
        await axios.delete(`/transactions/${id}`);
        await getTransactions();
      } catch (error) {
        console.error("Gagal menghapus transaksi:", error);
      }
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingItem(null);
    setFormData({
      type: "pemasukan",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      getTransactions(page);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card title="Total Pemasukan" value={totalPemasukan} icon={TrendingUp} color="green" />
          <Card title="Total Pengeluaran" value={totalPengeluaran} icon={TrendingDown} color="red" />
          <Card title="Saldo Bersih" value={saldoBersih} icon={DollarSign} color="blue" isSaldo />
        </div>

        {/* Filter */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex bg-gray-100 p-1 rounded-xl">
              {["semua", "pemasukan", "pengeluaran"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 capitalize ${
                    activeTab === tab
                      ? "bg-white text-blue-600 shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex gap-3 w-full lg:w-auto">
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
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Tanggal", "Kategori", "Tipe", "Jumlah", "Aksi"].map((title) => (
                    <th key={title} className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center">
                        <Filter className="w-12 h-12 text-gray-300 mb-4" />
                        <p className="text-lg font-medium">Tidak ada transaksi ditemukan</p>
                        <p className="text-sm">Coba ubah filter atau tambah transaksi baru</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        <span className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
                          {transaction.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${transaction.type === "pemasukan" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <span className={transaction.type === "pemasukan" ? "text-green-600" : "text-red-600"}>
                          {transaction.type === "pemasukan" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(transaction)} className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(transaction.id)} className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <nav className="flex justify-between items-center py-4 px-4">
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
      </div>

      {/* Modal */}
      {showAddModal && (
        <KeuanganModal
          show={showAddModal}
          onClose={closeModal}
          onSubmit={handleSubmit}
          formData={formData}
          setFormData={setFormData}
          editingItem={editingItem}
        />
      )}
    </div>
  );
};

// Card Komponen
const Card = ({ title, value, icon: Icon, color, isSaldo = false }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className={`text-2xl font-bold ${isSaldo ? (value >= 0 ? "text-blue-600" : "text-red-600") : `text-${color}-600`}`}>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(value)}
        </p>
      </div>
      <div className={`bg-${color}-100 p-3 rounded-full`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
    </div>
  </div>
);

export default KeuanganDashboard2;
