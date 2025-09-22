import axios from 'axios';
import { Bell, Calendar, ChevronLeft, ChevronRight, MapPin, Megaphone, Timer } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const PengumumanList = () => {
    const [pengumuman, setPengumuman] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
      const [totalPages, setTotalPages] = useState(1);
    
      useEffect(() => {  
        getPengumuman(currentPage);
      }, [currentPage]);
      const getPengumuman = async (pages = 1) => {
        try {
          const response = await axios.get(
            `http://localhost:3500/pengumuman?pages=${pages}&limit=5&order=desc`
          );
          setPengumuman(response.data.pengumuman);
          setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
          console.log("pengumuman: ", response.data.pengumuman);
        } catch (error) {
          console.log(error.message);
        }
      };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      getPengumuman(page);
    }
  };
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Pengumuman</h2>
    <div className="space-y-6">
      {pengumuman.map((item, index) => (
        <div
          key={index}
          className="group relative bg-gradient-to-br from-white via-gray-50 to-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100"
        >
          {/* Background pattern decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500 rounded-full transform -translate-x-12 translate-y-12"></div>
          </div>

          {/* Animated gradient border */}
          <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-green-400 via-green-500 to-green-600 rounded-r-xl group-hover:w-2 transition-all duration-300"></div>
          
          {/* Corner accent */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>

          <div className="relative p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                {/* Status indicator */}
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="w-4 h-4 text-green-500 rounded animate-pulse" />
                  <span className="text-xs font-medium text-green-600 uppercase tracking-wider">Pengumuman</span>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300">
                  {item.judul}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">{item.deskripsi}</p>
                
                <div className=" text-sm">
                  {/* Date card */}
                  <div className="flex w-fit items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-shadow duration-200">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-700 font-medium">
                      {new Date(item.createdAt).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom decorative line */}
            <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
          </div>

          {/* Hover glow effect */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 rounded-xl shadow-xl shadow-green-500/10"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
  {/* Pagination */}
  <div className="flex justify-center items-center space-x-2 mt-8">
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
  >
    <ChevronLeft size={20} />
  </button>

  {Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((page) => {
      return (
        page === 1 ||
        page === 2 ||
        page === 3 ||
        page === totalPages ||
        page === totalPages - 1 ||
        page === totalPages - 2 ||
        Math.abs(page - currentPage) <= 1
      );
    })
    .reduce((acc, page, idx, arr) => {
      if (idx > 0 && page - arr[idx - 1] > 1) {
        acc.push("...");
      }
      acc.push(page);
      return acc;
    }, [])
    .map((page, idx) =>
      page === "..." ? (
        <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-500">
          ...
        </span>
      ) : (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 rounded-lg transition-all duration-200 ${
            currentPage === page
              ? "bg-green-500 text-white shadow-lg"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      )
    )}

  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
  >
    <ChevronRight size={20} />
  </button>
</div>


</main>
        );
}

export default PengumumanList