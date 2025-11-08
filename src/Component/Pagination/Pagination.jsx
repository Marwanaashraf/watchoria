import clsx from "clsx";
export default function Pagination({
  page,
  totalPages,
  handlePagination,
  pagesList,
}) {
  const start = Math.max(0, page - 3);
  const end = Math.min(totalPages, start + 5);
  return (
    <div className="pagination my-8 text-center flex space-x-4 justify-center">
      {/* previous */}
      <button
        disabled={page == 1}
        onClick={() => {
          handlePagination(page - 1);
        }}
        className="page-btn"
      >
        <i className="fa-solid fa-angle-left"></i>
      </button>

      {/* pages */}
      <div className="pages space-x-2 flex">
        {pagesList.slice(start, end).map((ele) => {
          return (
            <div
              key={ele}
              onClick={() => {
                handlePagination(ele);
              }}
              className={clsx(
                "rounded-lg px-4 py-2 cursor-pointer",
                ele === page
                  ? " bg-red-600 text-white "
                  : "dark:bg-slate-600 bg-slate-300 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white "
              )}
            >
              <span>{ele}</span>
            </div>
          );
        })}
      </div>

      {/* Next */}
      <button
        onClick={() => {
          handlePagination(page + 1);
        }}
        disabled={page == totalPages}
        className="page-btn  "
      >
        <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
}
