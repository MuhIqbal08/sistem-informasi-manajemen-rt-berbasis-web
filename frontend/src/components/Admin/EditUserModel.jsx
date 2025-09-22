import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditUserModal = ({ closeModal, userId, onUpdate }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("Laki-laki");
  const [alamat, setAlamat] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [message, setMessage] = useState("");
  const [roles, setRoles] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const { user } = useSelector((state) => state.auth);

  console.log("userId: ", userId)

  useEffect(() => {
  const getUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:3500/users/${userId}`);
      const user = response.data;
      setName(user.name);
      setUsername(user.username);
      setPassword(user.password);
      setConfirmPassword(user.confirmPassword);
      setRole(user.role);
      setJenisKelamin(user.jenis_kelamin);
      setAlamat(user.alamat);
      setNoTelp(user.no_telp);
      setProfilePicture(user.profilePicture);
    } catch (error) {
      console.log(error);
    }
  };
  getUserById()
  }, [userId]);

  useEffect(() => {
      const getRoles = async() => {
        try {
          const response = await axios.get('http://localhost:3500/roles')
          setRoles(response.data.roles)
          console.log('roles', response.data.roles)
        } catch (error) {
          
        }
      }
      getRoles()
  }, []);

  const editUser = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:3500/users/${userId}`, {
        name,
        username,
        password,
        confirmPassword,
        role,
        jenis_kelamin: jenisKelamin,
        alamat,
        no_telp: noTelp,
        profilePicture,
      });
      toast.success("User berhasil diubah");
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
            Form Ubah User
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
        <div>
        </div>
        <form className="p-4 md:p-5" onSubmit={editUser}>
          {message && <p className="bg-red-300 w-full mb-2 p-2 rounded has-text-centered">{message}</p>}
          {/* Form content */}
          <div className="grid gap-4 mb-4">
            <div class="col-span-2">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Name"
                required=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div class="col-span-2">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Username"
                required=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="price"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="price"
                id="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Password"
                required=""
                // value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="price"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="price"
                id="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Confirm Password"
                required=""
                // value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="price"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Role
              </label>
              <select
                id="category"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                {user?.role?.name === "admin" ? (
    <>
      <option value="">-- Pilih Role --</option>
      {roles.map((role) => (
        <option key={role.id} value={role.id}>
          {role.name}
        </option>
      ))}
    </>
  ) : user?.role?.name === "Sekretaris" ? (
    <>
      <option value="">-- Pilih Role --</option>
      {roles
        .filter((role) => role.id === 7)
        .map((role) => (
          <option key={role.id} value={role.id}>
            {role.name}
          </option>
        ))}
    </>
  ) : null}

  {user.role === "sekretaris" && (
    <option value="Warga">Warga</option>
  )}
              </select>
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="price"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Jenis Kelamin
              </label>
              <select
                id="category"
                defaultValue={"Laki-laki"}
                value={jenisKelamin}
                onChange={(e) => setJenisKelamin(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option selected="">Laki-laki</option>
                <option>Perempuan</option>
              </select>
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="price"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Alamat
              </label>
              <input
                type="text"
                name="price"
                id="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Alamat"
                required=""
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              />
            </div>
            <div class="col-span-2 sm:col-span-1">
              <label
                for="price"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nomor Telepon
              </label>
              <input
                type="number"
                name="price"
                id="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Nomor Telepon"
                required=""
                value={noTelp}
                onChange={(e) => setNoTelp(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Ubah User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
