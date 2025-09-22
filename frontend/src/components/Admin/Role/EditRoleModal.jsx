import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditRoleModal = ({ closeModal, onUpdate, userId }) => {
  const [name, setName] = useState("");
  // const [role, setRole] = useState("");
  const [roleGroup, setRoleGroup] = useState("");
  const [message, setMessage] = useState("");
  // const { user } = useSelector((state) => state.auth);

  const editRole = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3500/roles/${userId}`, {
        name,
        roleGroup: roleGroup,
      });

      toast.success("Role berhasil diUbahkan");
      onUpdate();
      closeModal();
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
        console.error(error.response.data);
      }
    }
  };

  useEffect(() => {
    const getRoleById = async () => {
      const response = await axios.get(`http://localhost:3500/roles/${userId}`);
      setName(response.data.name);
      setRoleGroup(response.data.roleGroup);
    };
    getRoleById();
  })
  return (
    <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 overflow-y-auto max-h-screen">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Form Ubah Role
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

        <form className="p-4 md:p-5" onSubmit={editRole}>
          {message && (
            <p className="bg-red-300 w-full mb-2 p-2 rounded text-center">
              {message}
            </p>
          )}

          <div className="grid gap-4 mb-4">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nama
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Nama"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Role Group
              </label>
              <select
                className="block w-full p-2.5 border rounded"
                value={roleGroup}
                onChange={(e) => setRoleGroup(e.target.value)}
              >
                <option value="">-- Pilih Role Grup --</option>
                <option value="Admin">Admin</option>
                <option value="Pengurus">Pengurus</option>
                <option value="Warga">Warga</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Ubah Role
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRoleModal;
