import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AddUserModel from "./AddUserModel";
import EditUserModal from "./EditUserModel";
import Pagination from "./Pagination";
import { useSelector } from "react-redux";
import api from "../../api/api";
import { toast } from "react-toastify";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState("");
  const { user } = useSelector((state) => state.auth);

  // console.log('user', user)
  const openModal = () => setIsModalOpen(true);
  const openModalEdit = () => setIsModalOpenEdit(true);
  const closeModal = () => setIsModalOpen(false);
  const closeModalEdit = () => setIsModalOpenEdit(false);

  useEffect(() => {
    getUsers(currentPage);
    getSearchUsers();
  }, [currentPage]);

  const getUsers = async (page = 1) => {
  const response = await axios.get(`${api}/users?page=${page}`);
  
  let data = response.data.users;

  if (user?.role?.name === "Sekretaris" || user?.role?.name === "Ketua RT" || user?.role?.name === "Wakil Ketua RT") {
    data = data.filter(u => u.role?.id === 7 || u.role?.name?.toLowerCase() === "warga");
  }

  setUsers(data);
  setTotalPages(response.data.totalPages);
  setCurrentPage(response.data.currentPage);
};

const getSearchUsers = async () => {
  const response = await axios.get(`http://localhost:3500/users`, {
    params: {
      search: searchTerm
    }
  });

  let data = response.data.users;

  if (user?.role?.name === "Sekretaris" || user?.role?.name === "Ketua RT" || user?.role?.name === "Wakil Ketua RT") {
    data = data.filter(u => u.role?.id === 7 || u.role?.name?.toLowerCase() === "warga");
  }

  setUserSearch(data);
};

const handleDelete = (id) => {
  deleteUsers(id);
};

  const deleteUsers = async (id) => {
    console.log("UUID yang dikirim:", id); 
    try {
      const response = await axios.delete(
        `http://localhost:3500/users/${id}`
      );
      console.log('delete')
      setMessage(response.data.message);
      getUsers(currentPage);
      getSearchUsers();
      toast.success("User berhasil dihapus!");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      }
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  const filteredUsers = userSearch.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedUsers = searchTerm ? filteredUsers : users;

  return (
    <div className="overflow-y-auto w-full px-2 md:px-0 p-0">
      <div className="p-4 rounded-lg">
        <div className="flex flex-col items-center rounded bg-white dark:bg-gray-900">
          {/* Search & Add */}
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
  className="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded w-full md:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  placeholder="Cari nama..."
  value={searchTerm}
  onChange={handleSearch}
/>
            </div>
            { user && (user?.role?.name === "admin" || user?.role?.name === "Sekretaris") ? (
              <Link
                to="#"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-sm md:text-base flex items-center px-2 py-1.5 font-semibold text-white rounded gap-1 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 transition-all duration-200"
                onClick={openModal}
              >
                <FaUserPlus /> Tambah User
              </Link>
            ):(
              <></>
            )}
          </div>

          {/* Modal Tambah */}
          {isModalOpen && (
            <div className="fixed inset-0 z-40">
              <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={closeModal}
              ></div>
              <AddUserModel closeModal={closeModal} onUpdate={getUsers} />
            </div>
          )}

          {/* Tabel User */}
          <div className="w-full overflow-x-auto scroll-smooth">
            <table className="min-w-[700px] px-2 md:min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="p-4">No</th>
                  <th className="px-6 py-3">Nama Lengkap</th>
                  <th className="px-6 py-3">Username</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Jenis Kelamin</th>
                  <th className="px-6 py-3">Alamat</th>
                  <th className="px-6 py-3">No Telepon</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedUsers.map((item, index) => (
                  <tr
                    key={item.uuid}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 capitalize"
                  >
                    <td className="w-4 p-4">
                      {searchTerm
                        ? index + 1
                        : (currentPage - 1) * 5 + index + 1}
                    </td>
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item.name}
                    </th>
                    <td className="px-6 py-4">{item.username}</td>
                    <td className="px-6 py-4">{item.role?.name}</td>
                    <td className="px-6 py-4">{item.jenis_kelamin}</td>
                    <td className="px-6 py-4">{item.alamat}</td>
                    <td className="px-6 py-4">{item.no_telp}</td>
                    <td className="flex flex-row gap-2 px-6 py-4">
                        {user && (user?.role?.name === "admin" || user?.role?.name === "Sekretaris") ? (
                        <>
                          <Link
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => {
                              openModalEdit();
                              setSelectedUserId(item.uuid);
                            }}
                          >
                            Edit
                          </Link>
                          <button
                          type="button"
                            onClick={() => {
  console.log('uuid dikirim:', item.uuid);
  handleDelete(item.uuid);
}}
                            className="font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </>
                        ):(
                          <></>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal Edit */}
          {isModalOpenEdit && (
            <div className="fixed inset-0 z-40">
              <div
                className="fixed inset-0 bg-black bg-opacity-50"
                onClick={closeModalEdit}
              ></div>
              <EditUserModal
                closeModal={closeModalEdit}
                onUpdate={getUsers}
                userId={selectedUserId}
              />
            </div>
          )}

          {/* Pagination */}
          {!searchTerm && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
