import axios from "axios";
import { Calendar, Clock, Info, Type } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditPengumumanModal = ({ closeModal, uuid, onUpdate }) => {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const {user} = useSelector((state) => state.auth)
  console.log('uuid: ', uuid)
  
  useEffect(() => {
    const getAgendaById = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/pengumuman/${uuid}`);
        const pengumuman = response.data;
        setJudul(pengumuman.judul);
        setDeskripsi(pengumuman.deskripsi);
        console.log('dataId: ', pengumuman);
      } catch (error) {
        console.log(error);
      }
    }

    getAgendaById();
  }, [uuid])
  

  const editPengumuman = async (e) => {
  e.preventDefault();
  try {
    await axios.put(`http://localhost:3500/pengumuman/${uuid}`, {
      userId: user.uuid,
      judul,
      deskripsi,
    });
    toast.success("Pengumuman Berhasil DiUbah!");
    onUpdate()
    closeModal(); 
  } catch (error) {
    console.log(error?.response?.data?.msg || "Terjadi kesalahan");
  }
};
  return (
    <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 overflow-y-auto max-h-screen">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-blue-950 dark:text-white">
            Form Ubah Pengumuman
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-red-950 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
        <form className="p-4 md:p-5" onSubmit={editPengumuman}>
          {/* {message && <p className="bg-red-300 w-full mb-2 p-2 rounded has-text-centered">{message}</p>} */}
          {/* Form content */}
          <div className="grid gap-4 mb-4">
            <div class="col-span-2">
              <label
                for="name"
                class="flex items-center text-sm font-medium text-gray-700 gap-2 mb-2"
              >
                <Type size={16} /> Nama Pengumuman
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Nama Pengumuman"
                required=""
              />
            </div>
            <div class="col-span-2">
              <label
                for="message"
                class="flex items-center text-sm font-medium text-gray-700 gap-2 mb-2"
              >
                <Info size={16} />
                Deskripsi
              </label>
              <textarea
                id="message"
                rows="4"
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
              ></textarea>
            </div>  
          </div>
          <button
            type="submit"
            className="text-white w-full bg-blue-600 hover:bg-indigo-800  font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Ubah Pengumuman
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPengumumanModal;
