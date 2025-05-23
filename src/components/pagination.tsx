import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount = 5 }) => {
  return (
    <ReactPaginate
    //   onPageChange={handlePageClick}
      breakLabel="..."
      nextLabel="Next →"
      previousLabel="← Prev"
      pageRangeDisplayed={3}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      className="flex items-center justify-center gap-2 mt-4"
      pageClassName="rounded-md overflow-hidden"
      pageLinkClassName="block px-3 py-2 bg-white border hover:bg-gray-50 text-sm font-medium text-gray-500 hover:text-gray-700"
      activeClassName="active-page"
      activeLinkClassName="active-link"
      previousClassName="rounded-md overflow-hidden"
      nextClassName="rounded-md overflow-hidden"
      previousLinkClassName="px-3 py-2 bg-white border hover:bg-gray-50 text-sm font-medium text-gray-500 hover:text-gray-700"
      nextLinkClassName="px-3 py-2 bg-white border hover:bg-gray-50 text-sm font-medium text-gray-500 hover:text-gray-700"
      disabledClassName="opacity-50 cursor-not-allowed"
      breakClassName="text-gray-500"
      style={{
        '--active-bg-color': '#2563eb',
        '--active-text-color': 'white',
      } as React.CSSProperties}
    />
  );
};

export default Pagination;
