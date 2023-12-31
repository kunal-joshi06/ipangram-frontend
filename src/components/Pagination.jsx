const Pagination = ({ currentPage, totalPages, pageChange }) => {
  const handlePageChange = (page) => {
    pageChange(page);
  };

  return (
    <div className="flex justify-center mt-4">
      <nav>
        <ul className="flex list-style-none">
          <li className="page-item">
            <button
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 && "active"}`}
            >
              <button
                className={`page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded ${
                  currentPage === index + 1
                    ? "text-white bg-blue-600 hover:bg-blue-600"
                    : "text-gray-800 hover:text-gray-800 hover:bg-gray-200"
                } focus:shadow-none`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li className="page-item">
            <button
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none "
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
