import axios from "axios";
import { TrendingUp, TrendingDown } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddModalKeuangan = ({ closeModal, onUpdate }) => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState();
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const { user } = useSelector((state) => state.auth);

  const addPemasukkan = async (e) => {
  e.preventDefault();
  if (!type) {
    toast.error("Silakan pilih tipe transaksi terlebih dahulu!");
    return;
  }

  console.log("Tipe saat submit:", type);
  try {
    await axios.post("http://localhost:3500/transaksi", {
      type,
      category,
      amount,
      date,
      // date: new Date(),
      userId: user.uuid,
    });
    toast.success(`${type === "pemasukan" ? "Pemasukan" : "Pengeluaran"} Berhasil Ditambahkan!`);
    onUpdate();
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
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Form Tambah {type === "pengeluaran" ? "Pengeluaran" : "Pemasukan"}
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={closeModal}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        <form className="p-4 md:p-5" onSubmit={addPemasukkan}>
          <div className="grid gap-4 mb-4">
            {/* Tipe Transaksi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-white">
                Tipe Transaksi
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setType("pemasukan")}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    type === "pemasukan"
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-300 hover:border-green-300"
                  }`}
                >
                  <TrendingUp className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm font-medium">Pemasukan</span>
                </button>
                <button
                  type="button"
                  onClick={() => setType("pengeluaran")}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    type === "pengeluaran"
                      ? "border-red-500 bg-red-50 text-red-700"
                      : "border-gray-300 hover:border-red-300"
                  }`}
                >
                  <TrendingDown className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-sm font-medium">Pengeluaran</span>
                </button>
              </div>
            </div>

            {/* Nama Transaksi */}
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nama {type === "pengeluaran" ? "Pengeluaran" : "Pemasukan"}
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Contoh: Iuran Warga"
                required
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            {/* Jumlah */}
            <div className="col-span-2">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Jumlah
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Masukkan jumlah"
                required
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* date */}
            {/* date */}
<div className="col-span-2">
  <label
    htmlFor="date"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    Tanggal
  </label>
  <input
    type="date"
    name="date"
    id="date"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
    required
    onChange={(e) => setDate(e.target.value)}
  />
</div>

          </div>

          <button
            type="submit"
            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Tambah {type === "pengeluaran" ? "Pengeluaran" : "Pemasukan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModalKeuangan;
