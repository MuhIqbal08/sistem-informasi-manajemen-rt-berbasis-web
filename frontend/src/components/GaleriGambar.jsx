import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GaleriGambar = () => {
  const [gambar, setGambar] = useState([]);
  const [judul, setJudul] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { uuid } = useParams();

  useEffect(() => {
    const getPhotoByGaleriId = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/galeri/gambar/${uuid}`);
        setGambar(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPhotoByGaleriId();
  }, [uuid]);

  useEffect(() => {
    const getGaleriById = async () => {
      try {
        const response = await axios.get(`http://localhost:3500/galeri/${uuid}`);
        setJudul(response.data.judul);
      } catch (error) {
        console.log(error);
      }
    };
    getGaleriById();
  }, [uuid]);

  // Bagi gambar menjadi 4 kolom
  const columns = [[], [], [], []];
  gambar.forEach((item, index) => {
    columns[index % 4].push(item);
  });

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold uppercase pb-4 bg-gradient-to-r from-green-600 to-blue-600 text-transparent inline-block bg-clip-text">Halal Bihalal</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {columns.map((column, colIndex) => (
          <div className="grid gap-4" key={colIndex}>
            {column.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer"
                onClick={() => setSelectedImage(item)}
              >
                <a href={`http://localhost:3500/uploads/${item.filename}`} className="cursor-pointer">
                <img
                  className="h-auto max-w-full rounded-lg hover:scale-105 transition-transform"
                  href={`http://localhost:3500/uploads/${item.filename}`}
                  src={`http://localhost:3500/uploads/${item.filename}`}
                  alt={`Gambar ${item.id}`}
                />
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Modal Preview & Download */}
      {/* {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative p-4 w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={`http://localhost:3500/uploads/${selectedImage.filename}`}
              alt={`Preview Gambar ${selectedImage.id}`}
              className="w-full max-h-[90vh] object-contain rounded"
            />
            <a
              href={`http://localhost:3500/uploads/${selectedImage.filename}`}
              download
              className="absolute top-0 right-0 bg-white px-4 py-2 rounded-sm mr-2 shadow text-black font-semibold"
            >
              Download
            </a>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default GaleriGambar;
