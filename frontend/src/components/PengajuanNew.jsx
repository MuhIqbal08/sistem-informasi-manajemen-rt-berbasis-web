import React, { useEffect, useState } from "react";
import {
  Download,
  Search,
  Filter,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import ModalPengajuanSurat from "./ModalPengajuanSurat";
const ttd = require("../assets/test.png");

export default function PengajuanNew() {
  // Sample data - replace with your actual pengajuanData
  const [pengajuanData, setPengajuanData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [noSurat, setNoSurat] = useState("");
  const [rtId, setRtId] = useState("");
  const [tahunSurat, setTahunSurat] = useState("");
  const [noRT, setNoRT] = useState("");
  const [ttdImage, setTtdImage] = useState("");
  const [namaRT, setNamaRT] = useState("");
  const [tanggalACC, setTanggalACC] = useState("");
  const [dataId, setDataId] = useState("");
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Sudah ACC":
        return <CheckCircle className="w-4 h-4" />;
      case "Ditolak":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Sudah ACC":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "Ditolak":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-amber-600 bg-amber-50 border-amber-200";
    }
  };

  const filteredData = pengajuanData.filter((item) => {
    const matchesSearch =
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keperluan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "Semua" || item.statusPengajuan === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatTanggal = (tanggal) => {
    const tanggalBaru = new Date(tanggal);
    return tanggalBaru.toLocaleDateString("id-ID", {
      // weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };
  useEffect(() => {
    const getPengajuan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3500/pengajuan/list/${user.uuid}`
        );
        setPengajuanData(response.data);
        // console.log("data", response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getPengajuan();
  }, [user]);

  useEffect(() => {
    const getRT = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/users/${rtId}`);
        const data = response.data;
        setNamaRT(data.name);
        console.log("data", data);
        // setTtdImage(data.ttd);
      } catch (error) {
        console.error(error);
      }
    };
    getRT();
  }, [rtId]);

  const handleEdit = (id) => {
    console.log(`Edit pengajuan dengan ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete pengajuan dengan ID: ${id}`);
  };

  useEffect(() => {
    const getTtd = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3500/suratTtd/${dataId}`
        );
        const data = response.data;
        setNoSurat(data.nomorSurat);
        setTahunSurat(data.tahunSurat);
        setRtId(data.rtId);
        setTtdImage(data.ttdImage);
        setNoRT(data.noRt);
        setTanggalACC(data.updatedAt);
        console.log("data", data);
        // setTtdImage(data.ttd);
      } catch (error) {
        console.error(error);
      }
    };
    getTtd();
  }, [dataId]);

  // Surat Pengantar
  const downloadPDF = async (suratId) => {
    try {
      const response = await axios.get(
        `http://localhost:3500/pengajuan/list/${user.uuid}/${suratId}`
      );
      setData(response.data);
      console.log("data: ", response.data);
      const formattedDate = new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(response.data.updatedAt));
      setDate(formattedDate);
      setIsReady(true);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      return;
    }
  };

  useEffect(() => {
    if (!isReady || !data) return;

    const content = document.querySelector("#suratpengantar");
    if (!content) {
      console.error("Elemen #suratpengantar tidak ditemukan.");
      return;
    }

    content.style.height = "297mm";
    content.style.maxHeight = "297mm";
    content.style.overflow = "hidden";

    const opt = {
      filename: "SuratPengantar.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 1.5, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    setTimeout(() => {
      html2pdf()
        .set(opt)
        .from(content)
        .save()
        .then(() => {
          content.style.height = "";
          content.style.maxHeight = "";
          content.style.overflow = "";
          setIsReady(false);
        });
    }, 500);
  }, [isReady, data]);

  const options = [
    "Membuat KTP Baru / Perpanjangan",
    "Membuat Kartu Keluarga",
    "Membuat Akta Kelahiran",
    "Surat Keterangan Kematian / Ahli Waris",
    "Surat Keterangan Keluarga Ekonomi Lemah",
    "Surat Keterangan Ijin Usaha",
    "Surat Keterangan Tempat Tinggal / Domisili",
    "Surat Keterangan Pindah Rumah / Alamat",
    "Surat Keterangan Belum Menikah",
    "Surat Keterangan Musibah Banjir / Kebakaran",
    "Surat Keterangan Kelakuan Baik / SKCK",
    "Surat Keterangan Pembuatan Akta Tanah / SPPT / PBB",
    "Surat Keterangan Domisili Usaha / Yayasan",
    "Lainnya",
  ];

  const midIndex = Math.ceil(options.length / 2);
  const leftColumn = options.slice(0, midIndex);
  const rightColumn = options.slice(midIndex);

  console.log(user);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-sm shadow-xl shadow-blue-100/50 rounded-2xl p-6 sm:p-8 mb-6 border border-white/20">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    Daftar Pengajuan
                  </h1>
                  <p className="text-slate-600 mt-1">
                    Kelola dan pantau status pengajuan dokumen
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full font-medium text-sm">
                  {filteredData.length} Pengajuan
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-blue-200"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Tambah Pengajuan</span>
                  <span className="sm:hidden">Tambah</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-blue-100/30 rounded-xl p-4 sm:p-6 mb-6 border border-white/20">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari nama atau keperluan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/70"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white/70 appearance-none cursor-pointer min-w-[180px]"
                >
                  <option value="Semua">Semua Status</option>
                  <option value="Sudah ACC">Sudah ACC</option>
                  <option value="Menunggu Persetujuan">
                    Menunggu Persetujuan
                  </option>
                  <option value="Ditolak">Ditolak</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white/80 backdrop-blur-sm shadow-xl shadow-blue-100/50 rounded-2xl overflow-hidden border border-white/20">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider w-16">
                      No
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Nama Pemohon
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Keperluan
                    </th>
                    <th className="px-4 sm:px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider w-32">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentData.length > 0 ? (
                    currentData.map((item, index) => (
                      <tr
                        key={item.id}
                        className="hover:bg-blue-50/50 transition-colors duration-200"
                      >
                        <td className="px-4 sm:px-6 py-4 text-sm font-medium text-slate-900">
                          <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full text-xs font-bold text-slate-700">
                            {startIndex + index + 1}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="text-sm font-medium text-slate-900">
                            {item.nama}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(
                              item.statusPengajuan
                            )}`}
                          >
                            {getStatusIcon(item.statusPengajuan)}
                            <span className="whitespace-nowrap">
                              {item.statusPengajuan}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-sm text-slate-700">
                          <div
                            className="max-w-xs truncate"
                            title={item.keperluan}
                          >
                            {item.keperluan}
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-center">
                          {item.statusPengajuan === "Sudah ACC" ? (
                            <button
                              onClick={() => {
                                setDataId(item.uuid);
                                downloadPDF(item.uuid);
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-medium rounded-lg hover:from-emerald-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-emerald-200"
                            >
                              <Download className="w-3 h-3" />
                              <span className="hidden sm:inline">Download</span>
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400 italic">
                              Tidak tersedia
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-4 sm:px-6 py-12 text-center"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <FileText className="w-12 h-12 text-slate-300 mb-4" />
                          <h3 className="text-lg font-medium text-slate-900 mb-2">
                            Tidak ada data ditemukan
                          </h3>
                          <p className="text-slate-600 mb-4">
                            Coba ubah filter pencarian atau kata kunci Anda.
                          </p>
                          <button
                            onClick={() => setShowModal(true)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
                          >
                            <Plus className="w-4 h-4" />
                            Tambah Pengajuan Pertama
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {filteredData.length > 0 && totalPages > 1 && (
            <div className="bg-white/80 backdrop-blur-sm shadow-lg shadow-blue-100/30 rounded-xl p-4 sm:p-6 mt-6 border border-white/20">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Pagination Info */}
                <div className="text-sm text-slate-600">
                  Menampilkan{" "}
                  <span className="font-medium text-slate-900">
                    {startIndex + 1}
                  </span>{" "}
                  sampai{" "}
                  <span className="font-medium text-slate-900">
                    {Math.min(endIndex, filteredData.length)}
                  </span>{" "}
                  dari{" "}
                  <span className="font-medium text-slate-900">
                    {filteredData.length}
                  </span>{" "}
                  pengajuan
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-1">
                  {/* Previous Button */}
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      currentPage === 1
                        ? "text-slate-400 cursor-not-allowed"
                        : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((pageNum, index) => (
                      <React.Fragment key={index}>
                        {pageNum === "..." ? (
                          <span className="px-2 py-2 text-slate-400">...</span>
                        ) : (
                          <button
                            onClick={() => goToPage(pageNum)}
                            className={`w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200 ${
                              currentPage === pageNum
                                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg"
                                : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                          >
                            {pageNum}
                          </button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      currentPage === totalPages
                        ? "text-slate-400 cursor-not-allowed"
                        : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Summary */}
          {filteredData.length > 0 && (
            <div className="mt-6 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span>
                    Total: <strong>{filteredData.length}</strong> pengajuan
                  </span>
                  <span>•</span>
                  <span>
                    ACC:{" "}
                    <strong className="text-emerald-600">
                      {
                        filteredData.filter(
                          (item) => item.statusPengajuan === "Sudah ACC"
                        ).length
                      }
                    </strong>
                  </span>
                  <span>•</span>
                  <span>
                    Menunggu:{" "}
                    <strong className="text-amber-600">
                      {
                        filteredData.filter(
                          (item) =>
                            item.statusPengajuan === "Menunggu Persetujuan"
                        ).length
                      }
                    </strong>
                  </span>
                  <span>•</span>
                  <span>
                    Ditolak:{" "}
                    <strong className="text-red-600">
                      {
                        filteredData.filter(
                          (item) => item.statusPengajuan === "Ditolak"
                        ).length
                      }
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <ModalPengajuanSurat closeModal={() => setShowModal(false)} />
        </div>
      )}
      <div className=" bg-gray-100 hidden">
        <div
          id="suratpengantar"
          className="w-full h-full lg:w-a4 lg:h-a4 mx-auto bg-white p-6 shadow-md border"
        >
          <div className="text-center">
            <h1 className="text-lg font-extrabold uppercase">
              Pemerintah Kabupaten Bekasi
            </h1>
            <h2 className="text-lg font-extrabold uppercase">
              Kecamatan Babelan - Kelurahan Bahagia
            </h2>
            <h3 className="text-xl font-extrabold uppercase">
              Rukun Warga 022
            </h3>
            <p className="text-xs font-semibold">
              Sekretariat: Perumahan Pondok Ungu Permai Sektor V Blok C RW 022,
              Kode Pos 17612 - Telp. 021-88883185
            </p>
            <hr className="h-px my-2 font-bold border-black border-2" />
          </div>

          <div className="w-fit flex flex-col mx-auto mb-1">
            <h3
              className="text-center text-lg font-extrabold uppercase "
              id="title"
            >
              Surat Pengantar
            </h3>
            <hr className=" border-black border " />
          </div>

          {data.statusPengajuan === "Sudah ACC" ? (
            <div className="flex justify-center font-semibold mb-4">
              <div>
                No. {noSurat} / SPRT / 0{noRT} / {tahunSurat}
              </div>
            </div>
          ) : (
            <div className="flex justify-center font-semibold mb-4">
              <div>No. ....... / SPRT / ....... / 20.......</div>
            </div>
          )}

          <p className="mb-4 text-sm">
            Yang bertanda tangan di bawah ini, Pengurus RT 0{noRT} RW 022
            Perumahan Pondok Ungu Permai V – Kelurahan Bahagia – Kecamatan
            Babelan – Kabupaten Bekasi, dengan ini menerangkan :
          </p>

          <div className="mb-4 text-sm mx-16">
            <table>
              <tbody>
                <tr>
                  <td>Nama</td>
                  <td className="pl-2">: {data.nama}</td>
                </tr>
                <tr>
                  <td style={{ whiteSpace: "nowrap" }}>
                    Tempat, Tanggal Lahir
                  </td>
                  <td className="pl-2">: {data.ttl}</td>
                </tr>
                <tr>
                  <td>Jenis Kelamin</td>
                  <td className="pl-2">: {data.jenisKelamin}</td>
                </tr>
                <tr>
                  <td className="absolute">Alamat</td>
                  <td className="pl-2">
                    : Perumahan Pondok Ungu Permai Sektor V Blok {data.alamat}{" "}
                    RT 02 RW
                    <br />
                    <span className="pl-2">
                      022, Kelurahan Bahagia, Kecamatan Babelan, Kabupaten
                      Bekasi
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Nomor KTP</td>
                  <td className="pl-2">: {data.nomorKtp}</td>
                </tr>
                <tr>
                  <td>Kewarganegaraan</td>
                  <td className="pl-2">: {data.kewarganegaraan}</td>
                </tr>
                <tr>
                  <td>Agama</td>
                  <td className="pl-2">: {data.agama}</td>
                </tr>
                <tr>
                  <td>Status Perkawinan</td>
                  <td className="pl-2">: {data.statusPerkawinan}</td>
                </tr>
                <tr>
                  <td>Pekerjaan</td>
                  <td className="pl-2">: {data.pekerjaan}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="font-bold flex text-sm mb-2">
            Bahwa yang bersangkutan membutuhkan surat untuk keperluan :
          </p>

          {data.keperluanId && (
            <div className="grid grid-cols-2 mb-4 text-sm">
              <div className="flex flex-col">
                {leftColumn.map((option, index) => {
                  const number = index + 1;
                  return (
                    <label key={number} className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2"
                        disabled
                        checked={data.keperluanId === index + 1}
                      />
                      {number}. {option}
                    </label>
                  );
                })}
              </div>
              <div className="flex flex-col">
                {rightColumn.map((option, index) => {
                  const number = midIndex + index + 1;
                  const realIndex = midIndex + index;
                  // console.log('realIndex', realIndex)
                  return (
                    <label key={number} className="flex items-center -ml-6">
                      {number === data.keperluanId + 1 ? (
                        <>
                          <input
                            type="checkbox"
                            className="mr-2"
                            disabled
                            checked={data.keperluanId + 1 === number + 1}
                          />
                          {data.keperluanId + 1}. {data.keperluan}
                        </>
                      ) : (
                        <>
                          <input
                            type="checkbox"
                            className="mr-2"
                            disabled
                            checked={data.keperluanId === realIndex}
                          />
                          {number}. {option}
                        </>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mb-4 text-sm">
            <p>
              Demikian surat keterangan ini dikeluarkan sesuai dengan keadaan
              sebenarnya agar dapat dipergunakan sebagaimana mestinya dan kepada
              pihak-pihak yang terkait dimohon memberikan bantuan seperlunya.
            </p>
          </div>

          <div className="flex justify-between mt-4 text-sm">
            <div className="text-left">
              <br />
              <p>Mengetahui Ketua RW / 022</p>
              <p>No. Registrasi : ......... / RW 022 / ......... / 20</p>
              <p>Tanggal : ..........................................</p>
              <br />
              <br />
              <br />
              <br />
              <p>..............................................</p>
            </div>
            <div className="text-left flex flex-col">
              {data.statusPengajuan === "Sudah ACC" ? (
                <>
                  <p>Bekasi, {formatTanggal(tanggalACC)}</p>
                  <p>Ketua RT</p>
                  <div className="flex flex-col text-center mt-1">
                    <p className=""></p>
                    <img
                      src={`http://localhost:3500${ttdImage}`}
                      alt="TTDRT"
                      className="w-24 h-24 my-2 mx-auto"
                    />
                    <div className="flex flex-col text-center mt-1">
                      <p className="">{namaRT}</p>
                      <p className="-mt-3">
                        ..............................................
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p>Bekasi, .....................................</p>
                  <p>Ketua RT</p>
                  <div className="flex flex-col text-center mt-1">
                    <p className=""></p>
                    <p className="mt-24">
                      ..............................................
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="text-xs mt-10">
            <p>- Putih untuk Ybs, Merah Arsip RT, Kuning Arsip RW</p>
            <p>
              - Surat pengantar dapat diproses apabila warga telah memenuhi
              kewajiban bulanan
            </p>
          </div>
        </div>
        <div className="flex justify-center mt-2 gap-4">
          <button
            className="bg-green-500 hover:bg-green-600 rounded-md transition-all font-semibold px-4 py-1"
            onClick={downloadPDF}
          >
            Download
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 rounded-md transition-all font-semibold px-4 py-1"
            onClick={downloadPDF}
          >
            Download
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 rounded-e-md transition-all font-semibold px-4 py-1"
            onClick={() => navigate("/pengajuan/list")}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
}
