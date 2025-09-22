import axios from "axios";
import { Calendar, Check, CreditCard, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/api";
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const IuranCardWarga = () => {
  const [year, setYear] = useState([]);
  const [paymentYear, setPaymentYear] = useState();
  const [monthList, setMonthList] = useState([]);
  const [pembayaranList, setPembayaranList] = useState([]);
  const [name, setName] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

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
      setPaymentYear(year[0].uuid);
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
          `http://localhost:3500/kasyear/${userId}/${paymentYear}`
        );
        console.log("monthList:", response.data);
        setMonthList(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getKasMonthByUserId();
  }, [userId, paymentYear]);

  useEffect(() => {
    const getUsersById = async() => {
      try {
        const response = await axios.get(
          `${api}/users/${userId}`
        );
        setName(response.data.name);
        // const user = response.data;
        console.log("user", response.data);
        // setName(user.name);
        // setAlamat(user.alamat);
      } catch (error) {
        console.log(error);
      }
    }
    getUsersById();
  }, [userId]);

const confirmOffline = async (userId, monthId, bendaharaId) => {
  try {
    const res = await axios.post(
      `http://localhost:3500/payment/offline/${monthId}`,
      { bendaharaId }
    );

    toast.success("Pembayaran Offline Berhasil Dikonfirmasi");

    setMonthList((prev) =>
      prev.map((month) =>
        month.uuid === monthId
          ? { ...month, status: "Sudah ACC", tanggalPembayaran: new Date().toISOString().split("T")[0] }
          : month
      )
    );

  } catch (error) {
    toast.error("Gagal konfirmasi pembayaran offline");
    console.error(error);
  }
};



  return (
    <>
      <div className="backdrop-blur-sm  shadow-lg border border-white/20 p-2 overflow-hidden">
        <div className="flex flex-col md:flex-row p-4 md:p-6 border-b border-gray-200 justify-between">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            Status Iuran {name}
          </h2>
          <div className="flex gap-2">
            <select
                className="bg-white border-2 border-gray-200 text-gray-900 text-sm rounded-xl py-1.5 px-4 min-w-[120px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                onChange={(e) => setPaymentYear(e.target.value)}
                value={paymentYear}
              >
                {year.map((y) => (
                  <option key={y.uuid} value={y.uuid}>
                    {y.year}
                  </option>
                ))}
              </select>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-sm md:text-base flex items-center px-2 py-1.5 font-semibold text-white rounded gap-1 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 transition-all duration-200" onClick={() => navigate(-1)}>
            <FaArrowLeft size={16} />
            Kembali
            </button>

          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white">
            <thead className="bg-blue-200">
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
                        <div className="flex justify-center">
                      <button className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-gray-400 rounded-full hover:bg-blue-400 hover:text-gray-800 transition-all duration-200"
                        onClick={() => confirmOffline(userId, month.uuid, user.uuid)}
                      >
                        <CreditCard size={16} />
                      </button>
                        {/* <button className="inline-flex items-center justify-center w-8 h-8 bg-red-100 text-gray-400 rounded-full hover:bg-red-400 hover:text-gray-800 transition-all duration-200">
                        <X size={16} />
                      </button> */}
                        </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default IuranCardWarga;
