import React from "react";

interface PaginationControlsProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalOrders: number;
  pageSize: number;
  setPageSize: (size: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
                                                                 currentPage,
                                                                 setCurrentPage,
                                                                 totalOrders,
                                                                 pageSize,
                                                                 setPageSize,
                                                               }) => {
  console.log("totalOrders", totalOrders, currentPage, pageSize);
  const totalPages = Math.ceil(totalOrders / pageSize);
  const currentDisplayPage = currentPage + 1;

  return (
    <div className="flex justify-between items-center">
      {/* Items per page dropdown */}
      <div className="flex items-center gap-2">
        <span className="text-sm">Items per page:</span>
        <select
          className="border rounded p-1"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        <button
          className={`border px-3 py-1 rounded ${
            currentDisplayPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-black hover:bg-gray-50'
          }`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentDisplayPage === 1}
        >
          Back
        </button>
        <span>
          Page {currentDisplayPage} of {totalPages || 1}
        </span>
        <button
          className={`border px-3 py-1 rounded ${
            currentDisplayPage === totalPages || totalPages === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-black hover:bg-gray-50'
          }`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentDisplayPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
