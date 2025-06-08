import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import Button from "./Button";
import Show from "../show";
import { useNavigate } from "react-router-dom";
import { Meta } from "../../services/note/types";


const Pagination = ({ meta, }: { meta: Meta | undefined }) => {
  if (!meta) {
    return null;
  }

  const { lastPage, page, hasNextPage, hasPrevPage } = meta;

  const navigate = useNavigate();

  const getPageNumbers = () => {
    const pageNumbers = [];

    if (lastPage <= 5) {
      for (let i = 1; i <= lastPage; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      if (page > 3) {
        pageNumbers.push("...");
      }

      const startPage = Math.max(2, page - 1);
      const endPage = Math.min(lastPage - 1, page + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (page < lastPage - 2) {
        pageNumbers.push("...");
      }

      if (lastPage > 1) {
        pageNumbers.push(lastPage);
      }
    }

    return pageNumbers;
  };

  const handlePageClick = (newPage: number) => {
    navigate(`?page=${newPage}`);
  };

  const pageNumbers = getPageNumbers();

  return (
    <Show when={lastPage > 1}>
      <div className='flex justify-center items-center gap-3 w-fit mx-auto'>
        {/* Previous button */}
        <Button
          onClick={() => hasPrevPage && handlePageClick(page - 1)}
          disabled={!hasPrevPage}
          className={`border-black  
          ${hasPrevPage && "bg-yellow-200"}`}
          aria-label='Previous page'
        >
          <ChevronLeft />
        </Button>

        {/* Page numbers */}
        {pageNumbers.map((pageNum, index) => (
          <React.Fragment key={index}>
            <Show
              when={pageNum !== "..."}
              fallback={<span className='px-3 py-1'>...</span>}>
              <Button
                onClick={() => handlePageClick(pageNum as number)}
                className={` ${page === pageNum && "bg-yellow-200 "}`}
                aria-current={page === pageNum ? "page" : undefined}
                aria-label={`Page ${pageNum}`}
              >
                {pageNum}
              </Button>
            </Show>
          </React.Fragment>
        ))}

        {/* Next button */}
        <Button
          onClick={() => hasNextPage && handlePageClick(page + 1)}
          disabled={!hasNextPage}
          className={` border-black ${hasNextPage && "bg-yellow-200"}`}
          aria-label='Next page'
        >
          <ChevronRight />
        </Button>
      </div>
    </Show>

  );
};

export default Pagination;
