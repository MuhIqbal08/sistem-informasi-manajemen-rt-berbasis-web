import axios from "axios";
import {
  ArrowDown01,
  Banknote,
  Calendar,
  CreditCard,
  DollarSign,
  QrCode,
  Upload,
  X,
  Zap,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { use } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
const qrcode = require("../assets/qrcode.png");

const ModalBayarKas = ({ closeModal, year }) => {
  const [bulan, setBulan] = useState("");
  const [berapaBulan, setBerapaBulan] = useState("");
  const [monthArray, setMonthArray] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState("");
  const { user } = useSelector((state) => state.auth);
  console.log("year", year);

  // useEffect(() => {
  //   const getUsersById = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3500/users/${user.uuid}`
  //       );
  //       // const user = response.data;
  //       console.log("user", user);
  //       setName(user.name);
  //       setAlamat(user.alamat);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getUsersById();
  // }, [user.uuid]);

  useEffect(() => {
    const getMonth = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3500/kasyear/${user.uuid}/${year}`
        );
        setMonthArray(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (year) {
      getMonth();
    }
  }, [user.uuid, year]);

  const numberMonth = Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1} Bulan`,
    value: i + 1,
  }));

  const handleSelectChangeManyMonth = (e) => {
    const selectedValue = parseInt(e.target.value);
    setBerapaBulan(selectedValue);
    setTotalAmount(selectedValue * 70000);
  };

  const addPayment = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3500/payment", {
        userId: user.uuid,
        kasMonthId: bulan,
        berapaBulan,
        amount: totalAmount,
      });
      toast.success("Pembayaran Berhasil Dikirim");
      closeModal();
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
        console.log(error);
      }
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    // <div
    //   className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto p-2 sm:p-4 pt-8 sm:pt-4"
    //   onClick={handleBackdropClick}
    // >
    //   <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-8 sm:my-8 max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-2rem)] flex flex-col">

    //     {/* Header with gradient - Fixed height */}
    //     <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-4 sm:p-6 text-white flex-shrink-0">
    //       <div className="absolute inset-0 bg-black/10"></div>
    //       <div className="relative flex items-center justify-between">
    //         <div className="flex items-center space-x-2 sm:space-x-3">
    //           <div className="p-1.5 sm:p-2 bg-white/20 rounded-full backdrop-blur-sm">
    //             <CreditCard className="w-4 h-4 sm:w-6 sm:h-6" />
    //           </div>
    //           <h3 className="text-lg sm:text-xl font-bold">Form Pembayaran Iuran</h3>
    //         </div>
    //         <button
    //           onClick={closeModal}
    //           className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 group flex-shrink-0"
    //         >
    //           <X className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-200" />
    //         </button>
    //       </div>
    //       <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-pink-400"></div>
    //     </div>

    //     {/* Scrollable Form Content */}
    //     <div className="flex-1 overflow-y-auto">
    //       <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
    //         {message && (
    //           <div className="bg-red-50 border-l-4 border-red-400 p-3 rounded-r-lg">
    //             <p className="text-red-700 text-sm font-medium">{message}</p>
    //           </div>
    //         )}

    //         {/* Month Selection */}
    //         <div className="space-y-2">
    //           <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
    //             <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
    //             <span>Pilih Bulan</span>
    //           </label>
    //           <select
    //             className="w-full p-3 sm:p-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 text-sm sm:text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 hover:border-gray-300"
    //             value={bulan}
    //             onChange={(e) => setBulan(e.target.value)}
    //             required
    //           >
    //             <option value="">Pilih Bulan</option>
    //             {monthArray.map((item, index) => (
    //               <option
    //                 key={index}
    //                 value={item.uuid}
    //                 disabled={item.status !== "Belum ACC"}
    //                 className={item.status !== "Belum ACC" ? "text-gray-400" : ""}
    //               >
    //                 {item.month}
    //               </option>
    //             ))}
    //           </select>
    //         </div>

    //         {/* Duration Selection */}
    //         <div className="space-y-2">
    //           <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
    //             <Zap className="w-4 h-4 text-purple-500 flex-shrink-0" />
    //             <span>Berapa Bulan</span>
    //           </label>
    //           <select
    //             className="w-full p-3 sm:p-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 text-sm sm:text-base focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 hover:border-gray-300"
    //             value={berapaBulan}
    //             onChange={handleSelectChangeManyMonth}
    //             required
    //           >
    //             <option value="">Pilih Berapa Bulan</option>
    //             {numberMonth.map((item, index) => (
    //               <option key={index} value={item.month}>
    //                 {item.month}
    //               </option>
    //             ))}
    //           </select>
    //         </div>

    //         {/* Total Amount */}
    //         <div className="space-y-2">
    //           <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
    //             <DollarSign className="w-4 h-4 text-green-500 flex-shrink-0" />
    //             <span>Total Bayar</span>
    //           </label>
    //           <div className="relative">
    //             <div className="absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 pointer-events-none">
    //               <span className="text-gray-500 font-medium text-sm sm:text-base">Rp.</span>
    //             </div>
    //             <input
    //               type="text"
    //               readOnly
    //               value={totalAmount.toLocaleString("id-ID")}
    //               className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-xl text-gray-800 font-bold text-base sm:text-lg"
    //             />
    //           </div>
    //         </div>

    //         {/* QR Code Section */}
    //         <div className="space-y-3">
    //           <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
    //             <QrCode className="w-4 h-4 text-indigo-500 flex-shrink-0" />
    //             <span>QR Code Pembayaran</span>
    //           </label>
    //           <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 rounded-2xl border-2 border-gray-200">
    //             <div className="flex flex-col items-center space-y-3 sm:space-y-4">
    //               <div className="p-3 sm:p-4 bg-white rounded-2xl shadow-lg border-4 border-gray-200">
    //                 <img
    //                   src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=12345"
    //                   alt="QR Code"
    //                   className="w-20 h-20 sm:w-24 sm:h-24"
    //                 />
    //               </div>
    //               <div className="text-center">
    //                 <p className="text-gray-600 text-xs sm:text-sm mb-2">Scan QR Code di atas atau transfer ke:</p>
    //                 <div className="bg-white px-3 sm:px-4 py-2 rounded-lg border-2 border-dashed border-red-300">
    //                   <span className="text-red-600 font-bold text-sm sm:text-lg tracking-wider">123450192</span>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         {/* File Upload */}
    //         <div className="space-y-2">
    //           <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
    //             <Upload className="w-4 h-4 text-orange-500 flex-shrink-0" />
    //             <span>Upload Bukti Pembayaran</span>
    //           </label>
    //           <div className="relative">
    //             <input
    //               type="file"
    //               className="w-full p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-dashed border-orange-300 rounded-xl text-xs sm:text-sm text-gray-600 hover:border-orange-400 transition-all duration-200 cursor-pointer file:mr-2 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-orange-500 file:text-white file:hover:bg-orange-600 file:transition-all file:duration-200"
    //               accept="image/*"
    //             />
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Fixed Submit Button */}
    //     <div className="flex-shrink-0 p-4 sm:p-6 pt-2 sm:pt-4 bg-white border-t border-gray-100">
    //       <button
    //         type="button"
    //         onClick={addPayment}
    //         className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
    //       >
    //         <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
    //         <span className="text-sm sm:text-base">Bayar Kas Sekarang</span>
    //       </button>
    //     </div>

    //     {/* Decorative Elements */}
    //     <div className="absolute top-16 sm:top-20 right-2 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl pointer-events-none"></div>
    //     <div className="absolute bottom-16 sm:bottom-20 left-2 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-400/20 to-yellow-400/20 rounded-full blur-lg pointer-events-none"></div>
    //   </div>
    // </div>

    <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 overflow-y-auto max-h-screen">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t bg-gradient-to-r from-blue-600 to-purple-600 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-white dark:text-white">
            Form Pembayaran Iuran
          </h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            onClick={closeModal}
          >
            <X
              size={24}
              className="font-bold text-white hover:text-blue-300 transition-all transform duration-200"
            />
          </button>
        </div>

        <form className="p-4 md:p-5" onSubmit={addPayment}>
          {message && (
            <p className="bg-red-300 w-full mb-2 p-2 rounded text-center">
              {message}
            </p>
          )}

          <div className="grid gap-4 mb-4">
            <div className="col-span-2">
              <label className="flex gap-1 items-center mb-2 text-sm font-medium text-gray-900 dark:text-white">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>Pilih Bulan</span>
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                value={bulan}
                onChange={(e) => setBulan(e.target.value)}
                required
              >
                <option value="">Pilih Bulan</option>
                {monthArray.map((item, index) => (
                  <option
                    key={index}
                    value={item.uuid}
                    disabled={item.status !== "Belum ACC"}
                  >
                    {item.month}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="flex gap-1 items-center mb-2 text-sm font-medium  dark:text-white">
                <ArrowDown01 className="w-4 h-4 text-indigo-600" />
                <span className="text-gray-900">Berapa Bulan</span>
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                value={berapaBulan}
                onChange={handleSelectChangeManyMonth}
                required
              >
                <option value="">Pilih Berapa Bulan</option>
                {numberMonth.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="flex gap-1 items-center text-sm font-medium text-gray-700 mb-1">
                <Banknote className="w-4 h-4 text-indigo-600" />
                <span>Total Bayar</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">Rp.</span>
                </div>
                <input
                  type="text"
                  readOnly
                  value={totalAmount.toLocaleString("id-ID")}
                  className="w-full pl-10 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-700 font-medium"
                />
              </div>
            </div>

            <div className="col-span-2">
              <label className="flex gap-1 items-center text-sm font-medium text-gray-700 mb-1">
                <QrCode className="w-4 h-4 text-indigo-600" />
                <span>QR Code</span>
              </label>
              <div className="relative">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=12345"
                  alt="qrcode"
                />
              </div>
              <p className="text-black mt-2 text-sm">
                Scan QR Code diatas atau No Rekening:{" "}
                <span className="text-red-600">123450192</span>
              </p>
            </div>

            <div className="col-span-2">
              <form class="max-w-lg mx-auto col-span-2">
                <label
                  class="flex gap-1 items-center mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  for="user_avatar"
                >
                  <Upload className="w-4 h-4 text-indigo-600" />
                  <span>Upload Bukti Pembayaran</span>
                </label>
                <input
                  type="file"
                  className="block w-full bg-gray-200 text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-600 file:to-indigo-600 file:text-white cursor-pointer"
                />
              </form>
            </div>
          </div>

          {/* <button
            type="submit"
            className="w-full text-white bg-gradient-to-tr from-blue-600 to-indigo-600 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 mt-3 transition-all duration-100"
          >
            Bayar Kas
          </button> */}

          <div className="flex bg-white border-t border-gray-100">
            <button
              type="submit"
              // onClick={addPayment}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <CreditCard className="w-4 h-4" />
              <span className="">Bayar Kas Sekarang</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalBayarKas;
