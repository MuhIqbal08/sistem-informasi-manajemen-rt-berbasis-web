import React, { useEffect, useState } from "react";
import "../App.css";
import { CalendarCheck, Globe, Heart, HeartHandshake, HomeIcon, Leaf, ShieldCheck, Smile, Target, Users } from "lucide-react";
const Home = () => {
  return (
    <div className="space-y-16">
      <section
        className="bg-cover bg-center text-white"
        style={{ backgroundImage: "url('../assets/test.jpg')" }}
      >
        <div className="relative bg-gradient-to-r from-green-600 to-blue-600 text-white py-28 overflow-hidden">
  {/* Overlay hitam transparan */}
  <div className="absolute inset-0 bg-black opacity-20"></div>

  {/* Dekorasi bulat kanan bawah */}
  <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-white opacity-10 rounded-full animate-pulse"></div>

  {/* Dekorasi bulat kiri atas */}
  <div className="absolute -left-20 -top-20 w-32 h-32 bg-white opacity-10 rounded-full animate-pulse"></div>

  {/* Dekorasi bulat kanan atas */}
  {/* <div className="absolute -right-10 -top-10 w-24 h-24 bg-white opacity-10 rounded-full animate-pulse"></div> */}

  {/* Konten utama */}
  <div className="relative max-w-7xl mx-auto px-4 text-center">
    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse">
      ERTERO WEBSITE
    </h1>
    <p className="text-xl md:text-2xl mb-8 opacity-90">
      Guyub, Aman, Nyaman, Dan Bahagia 
    </p>
    {/* <button className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
      Join Our Mission
    </button> */}
  </div>
</div>


      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Misi Kami</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Membangun lingkungan yang sehat dan nyaman untuk masyarakat
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HeartHandshake className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Kebersamaan</h3>
                  <p className="text-gray-600">Mendorong terciptanya hubungan yang harmonis dan saling mendukung antarwarga melalui kegiatan sosial, musyawarah, dan gotong royong.</p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Keamanan</h3>
                  <p className="text-gray-600">Membangun sistem keamanan berbasis partisipasi warga untuk menciptakan lingkungan yang tertib, aman, dan bebas dari gangguan.</p>
                </div>
                
                <div className="text-center p-6 bg-white rounded-lg shadow-lg">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HomeIcon className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Kenyamanan</h3>
                  <p className="text-gray-600">Mengembangkan lingkungan yang bersih, tertata, dan ramah anak serta lansia, demi mendukung kenyamanan dan kebahagiaan seluruh keluarga di wilayah RT.</p>
                </div>
              </div>
            </section>

      <section>
  <div className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: Users, number: "350+", label: "Warga Terdaftar" },
          { icon: HomeIcon, number: "120+", label: "Kepala Keluarga" },
          { icon: CalendarCheck, number: "30+", label: "Kegiatan RT / Tahun" },
          { icon: Smile, number: "95%", label: "Kepuasan Warga" }
        ].map((stat, index) => (
          <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300">
            <stat.icon className="mx-auto text-green-500 mb-4" size={48} />
            <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default Home;
