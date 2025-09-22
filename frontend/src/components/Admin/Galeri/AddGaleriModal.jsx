import axios from "axios";
import { Calendar, Clock, Image, Info, Type } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddGaleriModal = ({ closeModal, onUpdate }) => {
  const [judul, setJudul] = useState("");
  const [images, setImages] = useState([]);
  const [deskripsi, setDeskripsi] = useState("");
  const {user} = useSelector((state) => state.auth)

  const addGaleri = async (e) => {
  e.preventDefault();
    const formData = new FormData();
    formData.append('judul', judul);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      await axios.post('http://localhost:3500/galeri', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success("Galeri Berhasil Ditambahkan!");
      onUpdate()
      closeModal()
    } catch (err) {
  if (err.response) {
    console.error("Error Response:", err.response.data);
    toast.error(err.response.data.message || "Upload gagal");
  } else {
    console.error("Error:", err);
    toast.error("Terjadi kesalahan saat mengunggah");
  }
}
};
  return (
    <div className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 overflow-y-auto max-h-screen">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-lg font-semibold text-blue-950 dark:text-white">
            Form Tambah Galeri
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-blue-950 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
        <form className="p-4 md:p-5" onSubmit={addGaleri}>
          {/* {message && <p className="bg-red-300 w-full mb-2 p-2 rounded has-text-centered">{message}</p>} */}
          {/* Form content */}
          <div className="grid gap-4 mb-4">
            <div class="col-span-2">
              <label
                for="name"
                class="flex items-center text-sm font-medium text-gray-700 gap-2 mb-2"
              >
                <Type size={16} /> Nama Galeri
              </label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => setJudul(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Nama Galeri"
                required=""
                // onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="date"
                className="flex items-center text-sm font-medium text-gray-700 gap-2"
              >
                <Image size={16} />
                Gambar
              </label>

              <input
                class="block w-full rounded-lg bg-gray-200 text-sm text-gray-500 file:me-4 file:py-2 file:rounded-r-none file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-600 file:to-indigo-600 file:text-white hover:file:bg-red-700 hover:file:transition-all file:disabled:opacity-50 file:disabled:pointer-events-none dark:text-neutral-500 dark:file:bg-red-500 dark:hover:file:bg-red-400 transition-all duration-300"
                id="multiple_files"
                type="file"
                multiple
                onChange={(e) => setImages(e.target.files)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white w-full bg-blue-600 hover:bg-indigo-600 transition-all duration-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Tambah Galeri
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddGaleriModal;
