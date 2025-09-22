import axios from "axios";
import {
  BookOpenCheck,
  Briefcase,
  Calendar,
  ClipboardList,
  CreditCard,
  FileText,
  Globe,
  HeartHandshake,
  IdCard,
  MapPin,
  User,
  UserCheck,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ModalPengajuanSurat = ({ closeModal, year }) => {
  const [nama, setNama] = useState("");
  const [ttl, setTtl] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nomorKtp, setNomorKtp] = useState("");
  const [kewarganegaraan, setKewarganegaraan] = useState("");
  const [agama, setAgama] = useState("");
  const [statusPerkawinan, setStatusPerkawinan] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [keperluan, setKeperluan] = useState("");
  const [keperluanId, setKeperluanId] = useState("");
  const [message, setMessage] = useState("");

  const { user } = useSelector((state) => state.auth);

  const checkboxes = [
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

  const addPengajuan = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3500/pengajuan", {
        userId: user.uuid,
        nama,
        ttl,
        jenisKelamin,
        alamat,
        nomorKtp,
        kewarganegaraan,
        agama,
        statusPerkawinan,
        pekerjaan,
        statusPengajuan: "Belum ACC",
        keperluan,
        keperluanId,
      });
      toast.success("Pengajuan berhasil dikirim!");
      closeModal();
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
        console.log(error);
      }
    }
  };

  return (
    <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 overflow-y-auto max-h-screen">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-gradient-to-r from-blue-600 to-purple-600 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-white">
            Form Pengajuan Surat
          </h3>
          <button
            type="button"
            className="text-white hover:text-blue-300 transition"
            onClick={closeModal}
          >
            <X size={24} />
          </button>
        </div>

        <form className="p-4 md:p-5" onSubmit={addPengajuan}>
          {message && (
            <p className="bg-red-300 w-full mb-2 p-2 rounded text-center">
              {message}
            </p>
          )}

          <div className="grid gap-4 mb-4">
            {/* Nama */}
            <div>
              <label className="flex gap-1 items-center text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4 text-indigo-600" />
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* TTL */}
            <div>
              <label className="flex gap-1 items-center text-sm font-medium text-gray-700 mb-1">
                <Calendar className="w-4 h-4 text-indigo-600" />
                Tempat, Tanggal Lahir
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Bekasi, 10 Juli 1999"
                value={ttl}
                onChange={(e) => setTtl(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Jenis Kelamin */}
            <div>
              <label className="flex gap-1 items-center text-sm font-medium text-gray-700 mb-1">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                Jenis Kelamin
              </label>
              <select
                required
                value={jenisKelamin}
                onChange={(e) => setJenisKelamin(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>

            {/* Alamat */}
            <div>
              <label className="flex gap-1 items-center text-sm font-medium text-gray-700 mb-1">
                <MapPin className="w-4 h-4 text-indigo-600" />
                Alamat
              </label>
              <textarea
                required
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                rows={2}
              />
            </div>

            {/* Nomor KTP */}
            <div>
              <label className="flex gap-1 items-center text-sm font-medium text-gray-700 mb-1">
                <IdCard className="w-4 h-4 text-indigo-600" />
                Nomor KTP
              </label>
              <input
                type="number"
                required
                value={nomorKtp}
                onChange={(e) => setNomorKtp(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Kewarganegaraan */}
            <div>
              <label className="flex gap-1 items-center text-sm font-medium text-gray-700 mb-1">
                <Globe className="w-4 h-4 text-indigo-600" />
                Kewarganegaraan
              </label>
              <input
                type="text"
                required
                value={kewarganegaraan}
                onChange={(e) => setKewarganegaraan(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Agama */}
            <div>
              <label className="flex gap-1 items-center text-sm font-medium text-gray-700 mb-1">
                <BookOpenCheck className="w-4 h-4 text-indigo-600" />
                Agama
              </label>
              <input
                type="text"
                required
                value={agama}
                onChange={(e) => setAgama(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Status Perkawinan */}
            <div>
              <label className="flex gap-1 items-center text-sm font-medium text-gray-700 mb-1">
                <HeartHandshake className="w-4 h-4 text-indigo-600" />
                Status Perkawinan
              </label>
              <select
                required
                value={statusPerkawinan}
                onChange={(e) => setStatusPerkawinan(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Pilih Status</option>
                <option value="Belum Kawin">Belum Kawin</option>
                <option value="Sudah Kawin">Sudah Kawin</option>
              </select>
            </div>

            {/* Pekerjaan */}
            <div>
              <label className="flex gap-1 items-center text-sm font-medium text-gray-700 mb-1">
                <Briefcase className="w-4 h-4 text-indigo-600" />
                Pekerjaan
              </label>
              <input
                type="text"
                required
                value={pekerjaan}
                onChange={(e) => setPekerjaan(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Keperluan */}
            <div>
              <label className="flex gap-1 items-center text-sm font-medium text-gray-700 mb-1">
                <ClipboardList className="w-4 h-4 text-indigo-600" />
                Keperluan
              </label>
              <select
                required
                value={keperluan}
                onChange={(e) => {
                  setKeperluan(e.target.value);
                  setKeperluanId(e.target.selectedIndex); // contoh ID jika pakai index
                }}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="" disabled>
                  Pilih Keperluan
                </option>
                {checkboxes.map((label, index) => (
                  <option key={index} value={label}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {keperluanId === 14 && (
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-1">
                  <FileText className="w-4 h-4 text-blue-500 mr-2" />
                  Lainnya
                </label>
                <input
                  type="text"
                  name="lainnya"
                  // value={keperluan}
                  onChange={(e) => {
                    setKeperluan(e.target.value);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>
            )}
          </div>

          <div className="flex bg-white border-t border-gray-100">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Kirim Pengajuan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalPengajuanSurat;
