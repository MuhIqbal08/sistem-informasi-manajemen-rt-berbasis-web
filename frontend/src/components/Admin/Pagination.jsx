import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const createButton = (page) => (
    <button
      key={page}
      onClick={() => onPageChange(page)}
      className={`flex items-center justify-center w-10 h-10 rounded text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
        currentPage === page
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400"
      }`}
    >
      {page}
    </button>
  );

  const createDots = (key) => (
    <div key={key} className="flex items-center justify-center w-10 h-10">
      <MoreHorizontal className="w-5 h-5 text-gray-400" />
    </div>
  );

  const renderPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(createButton(i));
      }
    } else {
      pages.push(createButton(1));
      if (currentPage > 4) pages.push(createDots("start"));

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 4) endPage = 5;
      if (currentPage >= totalPages - 3) startPage = totalPages - 4;

      for (let i = startPage; i <= endPage; i++) {
        if (i > 1 && i < totalPages) pages.push(createButton(i));
      }

      if (currentPage < totalPages - 3) pages.push(createDots("end"));
      if (totalPages > 1) pages.push(createButton(totalPages));
    }

    return pages;
  };

  return (
    <div className="flex items-center w-full justify-center lg:justify-end">
      <div className="flex items-center bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 p-1 gap-1">
        {/* Prev */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
        </button>

        {/* Page Buttons */}
        <div className="flex items-center gap-1">{renderPages()}</div>

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
          <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
