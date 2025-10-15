import React, { useState, useEffect } from "react";

import ReactPaginate from "react-paginate";

import EditIcon from "Assets/Icons/EditIcon";
import DeletIcon from "Assets/Icons/DeletIcon";
import { Link } from "react-router-dom";

const Tables = ({
  tableHeadLabels,
  tableData,
  itemsPerPage,
  deleteListHandler,
}) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(tableData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(tableData.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, tableData]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % tableData.length;
    setItemOffset(newOffset);
  };

  const getDate = (createdDate) => {
    const date = new Date(createdDate);
    return date.toLocaleDateString();
  };

  return (
    <>
      <table className="w-full border-separate border-spacing-y-5">
        <thead>
          <tr className="text-left p-10">
            {tableHeadLabels.map((item, i) => (
              <th key={i} className="py-2 px-4 capitalize">
                {item}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {currentItems &&
            currentItems.map((item, i) => (
              <tr className="" key={i}>
                <td className="first:border-l-2 last:border-r-2 first:rounded-l-md last:rounded-r-md py-6 px-4 border-y-2 border-[#C75454] capitalize">
                  #{item._id?.slice(-3)}
                </td>
                <td className="first:border-l-2 last:border-r-2 first:rounded-l-md last:rounded-r-md py-6 px-4 border-y-2 border-[#C75454] capitalize">
                  {item.username}
                </td>
                <td className="first:border-l-2 last:border-r-2 first:rounded-l-md last:rounded-r-md py-6 px-4 border-y-2 border-[#C75454] capitalize">
                  {item.status || "Active"}
                </td>
                <td className="first:border-l-2 last:border-r-2 first:rounded-l-md last:rounded-r-md py-6 px-4 border-y-2 border-[#C75454] capitalize">
                  {getDate(item.createdAt)}
                </td>
                <td className="marker:first:border-l-2 last:border-r-2 first:rounded-l-md last:rounded-r-md py-6 px-4 border-y-2 border-[#C75454]">
                  <Link to={{pathname: "editcustomer", search: `?id=${item._id}`}}>
                    <button className="group">
                      <EditIcon className="group-hover:stroke-[green]" />
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteListHandler(item._id)}
                    className="group ml-4"
                  >
                    <DeletIcon className="group-hover:stroke-[red]" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {tableData?.length > 3 ? (
        <div className="flex justify-center mt-5">
          <ReactPaginate
            nextLabel=">"
            previousLabel="<"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            pageClassName="page-item h-[2.8em] w-14 border-l border-black"
            pageLinkClassName="page-link inline-block w-full h-full  flex items-center justify-center"
            previousClassName="page-item  h-[2.8em] w-14 "
            previousLinkClassName="page-link inline-block w-full h-full  flex items-center justify-center"
            nextClassName="page-item h-[2.8em] w-14 border-l border-black"
            nextLinkClassName="page-link inline-block w-full h-full  flex items-center justify-center"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination border border-black"
            activeClassName=" bg-[#EA4444] text-white"
            renderOnZeroPageCount={null}
            className="flex border border-black rounded-md"
          />
        </div>
      ) : null}
    </>
  );
};

export default Tables;
