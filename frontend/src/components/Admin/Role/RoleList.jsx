import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AddRoleModal from "./AddRoleModal";
import EditRoleModal from "./EditRoleModal";
import Pagination from "../Pagination";
import { toast } from "react-toastify";

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [rolesSearch, setRolesSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState("");
  const { user } = useSelector((state) => state.auth);

  console.log('user', user)
  const openModal = () => setIsModalOpen(true);
  const openModalEdit = () => setIsModalOpenEdit(true);
  const closeModal = () => setIsModalOpen(false);
  const closeModalEdit = () => setIsModalOpenEdit(false);

  useEffect(() => {
    getRoles(currentPage);
    getSearchRoles();
  }, [currentPage]);

  const getRoles = async (page = 1) => {
    const response = await axios.get(
      `http://localhost:3500/roles?page=${page}`
    );
    setRoles(response.data.roles);
    setTotalPages(response.data.totalPages);
    setCurrentPage(response.data.currentPage);
  };

  const getSearchRoles = async () => {
    const response = await axios.get(`http://localhost:3500/roles`);
    setRolesSearch(response.data.roles);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3500/roles/${userId}`
      );
      setMessage(response.data.message);
      getRoles(currentPage);
      getSearchRoles();
      toast.success("Role berhasil dihapus!");
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

  const filteredUsers = rolesSearch.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedUsers = searchTerm ? filteredUsers : roles;

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
            { user && (user?.role?.name === "admin" || user?.role?.name === "sekretaris") ? (
              <Link
                to="#"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-sm md:text-base flex items-center px-2 py-1.5 font-semibold text-white rounded gap-1 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-blue-600 transition-all duration-200"
                onClick={openModal}
              >
                <FaUserPlus /> Tambah Role
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
              <AddRoleModal closeModal={closeModal} onUpdate={getRoles} />
            </div>
          )}

          {/* Tabel User */}
          <div className="w-full overflow-x-auto scroll-smooth">
            <table className="min-w-[700px] px-2 md:min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="p-4">No</th>
                  <th className="px-6 py-3">Nama Role</th>
                  <th className="px-6 py-3">Role Group</th>
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
                    <td className="px-6 py-4">{item.roleGroup}</td>
                    <td className="flex flex-row gap-2 px-6 py-4">
                        {user && (user?.role?.name === "admin" || user?.role?.name === "sekretaris") ? (
                        <>
                          <Link
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            onClick={() => {
                              openModalEdit();
                              setSelectedUserId(item.id);
                            }}
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
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
              <EditRoleModal
                closeModal={closeModalEdit}
                userId={selectedUserId}
                onUpdate={getRoles}
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

export default RoleList;
