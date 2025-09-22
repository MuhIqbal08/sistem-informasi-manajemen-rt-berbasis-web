import { Leaf } from "lucide-react";
import React from "react";
const logo = require("../assets/ertero.jpeg");

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 via-blue-500 to-green-600 text-transparent bg-clip-text bg-[length:200%_200%] animate-gradient-x">
            RT 02 / RW 022
          </span>
        </div>
        <p className="text-gray-300">
          Selamat datang di website resmi RT 02 / RW 022. Mari bersama menjaga kebersamaan, menciptakan lingkungan yang aman, nyaman, dan harmonis bagi seluruh warga.
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Kontak</h3>
        <div className="space-y-2 text-gray-300">
          <p>Email: rt022rw022@gmail.com</p>
          <p>Telepon: +62 812 9335 9816</p>
          <p>Alamat: Jl. Cemara IV & VI, Kel. Kebalen, Kec. Babelan, Kab. Bekasi, Jawa Barat</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Program RT</h3>
        <div className="space-y-2 text-gray-300">
          <p>Jumat Bersih</p>
          <p>Siskamling</p>
          <p>Posyandu Warga</p>
          <p>Pembinaan Remaja</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Media Sosial</h3>
        <div className="space-y-2 text-gray-300">
          <p>Facebook: Ertero Babelan</p>
          <p>Instagram: @ertero_babelan</p>
          <p>WhatsApp: ERTERO</p>
          <p>YouTube: ErteroBabelan Channel</p>
        </div>
      </div>
    </div>
    
    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
      <p>&copy; 2024 RT 02 / RW 022. Seluruh hak cipta dilindungi.</p>
    </div>
  </div>
</footer>

    </>
  );
};

export default Footer;
