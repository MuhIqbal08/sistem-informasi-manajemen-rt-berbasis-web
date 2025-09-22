import axios from "axios";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  MoreHorizontal,
  WalletCards,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "../Pagination";

const PembayaranList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [pembayaranList, setPembayaranList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [monthList, setMonthList] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getPaymentsAndUsers(currentPage);
  }, [currentPage]);

  const getPaymentsAndUsers = async (page = 1) => {
    try {
      const response = await axios.get(
        `http://localhost:3500/payment?page=${page}`
      );
      setPembayaranList(response.data.payment);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
      console.log(response.data);
      const userIds = [
        ...new Set(response.data.payment.map((item) => item.userId)),
      ]; 
      const monthIds = [
        ...new Set(response.data.payment.map((item) => item.kasMonthId)),
      ];

      const userDetails = await Promise.all(
        userIds.map(async (id) => {
          const res = await axios.get(`http://localhost:3500/users/${id}`);
          return res.data;
        })
      );
      const monthDetails = await Promise.all(
        monthIds.map(async (id) => {
          const res = await axios.get(`http://localhost:3500/kasmonth/${id}`);
          return res.data;
        })
      );

      console.log("userDetails", userDetails);
      console.log("monthDetails", monthDetails);
      setUserList(userDetails);
      setMonthList(monthDetails);

      // setUsers(userDetails);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredpembayarans = pembayaranList.filter((pembayaran) => {
    const user = userList.find((u) => u.uuid === pembayaran.userId);
    return user?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const updatePayment = async (id, monthId, userId) => {
    try {
      await axios.put(`http://localhost:3500/payment/${id}/${monthId}`, {
        bendaharaId: userId.uuid,
      });
      toast.success("Pembayaran Berhasil Dikonfirmasi");
      getPaymentsAndUsers(currentPage);
    } catch (error) {
      console.error("Gagal update pembayaran", error);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      getPaymentsAndUsers(page);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "reject":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <Check className="w-3 h-3" />;
      case "reject":
        return <X className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const getStatusColorProof = (status) => {
    switch (status) {
      case "Belum Ada":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Sudah Ada":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      // case 'reject':
      //   return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIconProof = (status) => {
    switch (status) {
      case "Sudah Ada":
        return <Check className="w-3 h-3" />;
      case "reject":
        return <X className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className="overflow-y-auto w-full md:px-0 px-2 p-0">
      <div className="p-4 rounded-lg">
        <div class="flex flex-col p-2 pb-2 rounded bg-white dark:bg-gray-900">
          <div className="flex flex-col md:flex-row md:justify-between w-full gap-2 p-2">
            <div className="relative mt-1">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded w-40 md:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for items"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Link
              to={"/iuran/list"}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-sm md:text-base flex items-center px-2 py-1.5 font-semibold text-white rounded gap-1 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 transition-all duration-200"
            >
              {" "}
              <WalletCards size={16} /> Kartu Iuran Warga
            </Link>
          </div>
          <div class="w-full overflow-x-auto scroll-smooth">
            <table class="min-w-[700px] px-2 md:min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="p-4">
                    No
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Nama
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Bulan
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Berapa Bulan
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Tanggal Pembayaran
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Jumlah
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Bukti Pembayaran
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredpembayarans.map((pembayaran, index) => {
                  const user = userList.find(
                    (u) => u.uuid === pembayaran.userId
                  );
                  const month = monthList.find(
                    (m) => m.uuid === pembayaran.kasMonthId
                  );

                  return (
                    <tr
                      key={pembayaran.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 capitalize"
                    >
                      <td className="w-4 p-4">{index + 1}</td>

                      <td className="px-6 py-4">
                        {user?.name || "Tidak diketahui"}
                      </td>

                      <td className="px-6 py-4">
                        {month?.month || "Bulan tidak ditemukan"}
                      </td>

                      <td className="px-6 py-4">
                        {pembayaran.berapaBulan} Bulan
                      </td>

                      <td className="px-6 py-4">{pembayaran.paymentDate}</td>

                      <td className="px-6 py-4">
                        Rp{pembayaran.amount?.toLocaleString("id-ID") || 0}
                      </td>

                      <td className={`px-6 py-4`}>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(
                            pembayaran.status
                          )}`}
                        >
                          {getStatusIcon(pembayaran.status)}
                          {pembayaran.status === "confirmed"
                            ? "Sudah"
                            : pembayaran.status === "pending"
                            ? "Belum"
                            : "Ditolak"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {pembayaran.buktiPembayaran ? (
                          <a
                            href={`http://localhost:3500/${pembayaran.buktiPembayaran}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Lihat
                          </a>
                        ) : (
                          "Belum ada"
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {pembayaran.status === "pending" && (
                          <button
                            className="bg-red-600 border px-2 py-1 rounded text-white hover:text-red-600 hover:bg-white hover:border-red-600 transition-all duration-150"
                            onClick={() =>
                              updatePayment(
                                pembayaran.uuid,
                                month.uuid,
                                user.uuid
                              )
                            }
                          >
                            Konfirmasi
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PembayaranList;
