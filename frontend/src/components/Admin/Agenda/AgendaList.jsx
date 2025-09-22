import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus, FaUserPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Pagination from "../Pagination";
import AddAgendaModal from "./AddAgendaModal";
import EditAgendaModal from "./EditAgendaModal";

const AgendaList = () => {
  const [agenda, setAgenda] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState();
  const [showing, setShowing] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  const { user } = useSelector((state) => state.auth);

  const openModal = () => setIsModalOpen(true);
  const openModalEdit = () => setIsModalOpenEdit(true);
  const closeModal = () => setIsModalOpen(false);
  const closeModalEdit = () => setIsModalOpenEdit(false);

  useEffect(() => {
    getAgenda(currentPage);
  }, [currentPage]);

  const getAgenda = async (page = 1) => {
    const response = await axios.get(
      `http://localhost:3500/agenda?page=${page}&limit=${limit}`
    );
    setAgenda(response.data.agenda);
    setTotalPages(response.data.totalPages);
    setCurrentPage(response.data.currentPage);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      getAgenda(page);
    }
  };

  const handleDelete = (id) => {
    deleteAgenda(id);
  };

  const deleteAgenda = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3500/agenda/${id}`);
      setMessage(response.data.message);
      toast.success("Agenda Berhasil Dihapus!");
      getAgenda();
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      }
    }
  };

  const formatTanggal = (tanggal) => {
    const tanggalBaru = new Date(tanggal);
    return tanggalBaru.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTitle = agenda.filter((agenda) =>
    agenda.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-y-auto w-full px-2 md:px-0 p-0">
      <div className="p-4 rounded-lg">
        <div class="flex flex-col items-center pb-4 bg-white dark:bg-gray-900 justify-between">
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
              to="#"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-sm md:text-base flex items-center px-2 py-1.5 font-semibold text-white rounded gap-1 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 transition-all duration-200"
              onClick={openModal}
            >
              <FaPlus /> Tambah Agenda
            </Link>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 z-40">
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={closeModal}
              ></div>
              {/* Modal */}
              <AddAgendaModal
                closeModal={closeModal}
                onUpdate={() => getAgenda(currentPage)}
              />
            </div>
          )}
          {/* <div className="">
            <Link
              to="#"
              className="bg-primary text-sm md:text-base flex border items-center px-2 py-1.5 mt-1 font-bold text-white rounded-lg border-primary hover:bg-white hover:text-primary hover:border-primary transition-all gap-1"
              onClick={openModal}
            >
              <FaPlus /> Tambah Agenda
            </Link>
          </div> */}
          <div class="w-full overflow-x-auto scroll-smooth">
            <table class="min-w-[700px] px-2 md:min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="p-4">
                    No
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Judul
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Deskripsi
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Tanggal
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Waktu
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Lokasi
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTitle.map((agenda, index) => (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 capitalize">
                    <td class="w-4 p-4">{index + 1}</td>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {agenda.title}
                    </th>
                    <td class="px-6 py-4 text-justify line-clamp-3">
                      {agenda.deskripsi}
                    </td>
                    <td class="px-6 py-4 text-justify">
                      {formatTanggal(agenda.tanggal)}
                    </td>
                    <td class="px-6 py-4 text-justify">{agenda.waktu}</td>
                    <td class="px-6 py-4 text-justify">{agenda.lokasi}</td>
                    <td class="px-6 py-4 text-justify space-x-2">
                      <Link
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => {
                          openModalEdit();
                          setSelectedId(agenda.uuid);
                        }}
                      >
                        Edit
                      </Link>
                      <Link
                        href="#"
                        onClick={() => handleDelete(agenda.uuid)}
                        class="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
              {isModalOpenEdit && (
                <div className="fixed inset-0 z-40">
                  {/* Overlay */}
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50"
                    onClick={closeModalEdit}
                  ></div>
                  {/* Modal */}
                  <EditAgendaModal
                    closeModal={closeModalEdit}
                    uuid={selectedId}
                    onUpdate={() => getAgenda(currentPage)}
                  />
                </div>
              )}
            </table>
            {/* Pagination */}
          </div>
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

export default AgendaList;
