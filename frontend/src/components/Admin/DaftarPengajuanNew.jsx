import React, { useEffect, useState } from 'react';
import { Eye, Check, X, Search, Filter, ChevronDown, MoreVertical, Calendar, User, FileText, Clock } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DaftarPengajuanNew = () => {
  const [pengajuanData, setPengajuanData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('nama');
  const [sortOrder, setSortOrder] = useState('asc');
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    getPengajuan(currentPage);
  }, [currentPage]);
  
  const getPengajuan = async () => {
    try {
      const response = await axios.get(`http://localhost:3500/pengajuan`);
      setPengajuanData(response.data.pengajuan);
      console.log("data", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Filter and search functionality
  useEffect(() => {
  let filtered = pengajuanData;

  // Helper untuk aman dari null
  const safeString = (val) => (val ?? '').toString().toLowerCase();

  // Filter pencarian
  if (searchTerm) {
    const lowerSearch = searchTerm.toLowerCase();
    filtered = filtered.filter((item) =>
      safeString(item.nama).includes(lowerSearch) ||
      safeString(item.keperluan).includes(lowerSearch) ||
      (item.nomorKtp ?? '').includes(searchTerm)
    );
  }

  // Filter status
  if (statusFilter !== 'all') {
    filtered = filtered.filter(
      (item) => (item.statusPengajuan ?? '').toLowerCase() === statusFilter.toLowerCase()
    );
  }

  // Sortir data
  filtered = [...filtered].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (sortBy === 'createdAt') {
      aValue = new Date(aValue ?? '');
      bValue = new Date(bValue ?? '');
    } else {
      aValue = (aValue ?? '').toString().toLowerCase();
      bValue = (bValue ?? '').toString().toLowerCase();
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  setFilteredData(filtered);
  setTotalPages(Math.ceil(filtered.length / itemsPerPage));
}, [searchTerm, statusFilter, pengajuanData, sortBy, sortOrder, itemsPerPage]);



  const handleEdit = async(e, userId, suratId) => {
    try {
      await axios.put(`http://localhost:3500/pengajuan/${suratId}`, {
        statusPengajuan: "Sudah ACC"
      })
      getPengajuan()
    } catch (error) {
      // setMessage(error.response.data.message)
      console.log(error)
    }
  };

  const handleReject = async(e, userId, suratId) => {
    try {
      await axios.put(`http://localhost:3500/pengajuan/${suratId}`, {
        statusPengajuan: "Tidak ACC"
      })
      getPengajuan();
    } catch (error) {
      // setMessage(error.response.data.message)
      console.log(error)
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Belum ACC':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Sudah ACC':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Ditolak':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Sudah ACC':
        return <Check className="w-3 h-3" />;
      case 'Ditolak':
        return <X className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Daftar Pengajuan Surat</h1>
              <p className="text-gray-600 text-sm">Kelola dan pantau status pengajuan surat warga</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <FileText className="w-4 h-4" />
                <span>{filteredData.length} Total</span>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari nama, keperluan, atau nomor KTP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <div className="relative min-w-[180px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none bg-white"
              >
                <option value="all">Semua Status</option>
                <option value="Belum ACC">Belum ACC</option>
                <option value="Sudah ACC">Sudah ACC</option>
                <option value="Ditolak">Ditolak</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-16">
                    <div className="flex items-center justify-center">
                      <span>No</span>
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors min-w-[200px]"
                    onClick={() => handleSort('nama')}
                  >
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>Nama Pemohon</span>
                      {sortBy === 'nama' && (
                        <ChevronDown className={`w-3 h-3 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[300px]">
                    <div className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      <span>Keperluan</span>
                    </div>
                  </th>
                  <th 
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors min-w-[120px]"
                    onClick={() => handleSort('createdAt')}
                  >
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Tanggal</span>
                      {sortBy === 'createdAt' && (
                        <ChevronDown className={`w-3 h-3 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                      )}
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[130px]">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Status</span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[150px]">
                    <span>Aksi</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-900 bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center">
                          {indexOfFirstItem + index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900 mb-1">{item.nama}</div>
                        <div className="text-xs text-gray-500">KTP: {item.nomorKtp}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900 leading-5">{item.keperluan}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(item.createdAt)}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(item.statusPengajuan)}`}>
                        {getStatusIcon(item.statusPengajuan)}
                        {item.statusPengajuan}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        {item.statusPengajuan === "Belum ACC" ? (
                          <>
                            <button
                              onClick={(e) => handleEdit(e, item.userId, item.uuid)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 text-white rounded-md text-xs font-medium hover:bg-emerald-700 transition-colors"
                              title="Setujui Pengajuan"
                            >
                              <Check className="w-3 h-3" />
                              ACC
                            </button>
                            <button
                              onClick={(e) => handleReject(e, item.userId, item.uuid)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-rose-600 text-white rounded-md text-xs font-medium hover:bg-rose-700 transition-colors"
                              title="Tolak Pengajuan"
                            >
                              <X className="w-3 h-3" />
                              Tolak
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => navigate(`/surat/${item.userId}/${item.uuid}`)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs font-medium hover:bg-blue-700 transition-colors"
                            title="Lihat Detail"
                          >
                            <Eye className="w-3 h-3" />
                            Lihat
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada data ditemukan</h3>
              <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Menampilkan {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredData.length)} dari {filteredData.length} data
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                  >
                    Sebelumnya
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 text-sm rounded-md transition-colors ${
                            currentPage === page
                              ? 'bg-blue-600 text-white'
                              : 'border border-gray-300 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DaftarPengajuanNew;