import React, { useState, useEffect } from "react";

import ReactPaginate from "react-paginate";

import DeletIcon from "Assets/Icons/DeletIcon";

const OrderListTable = ({
  tableHeadLabels,
  tableData,
  itemsPerPage,
  deleteListHandler,
  hideAction,
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

  const getTotalPrice = (foodList) => {
    const totalPrice = foodList
      .map((foodItem) => foodItem.price)
      .reduce((a, b) => a + b, 0);

    return totalPrice;
  };

  const getTextColorConditionally = (orderStatus) => {
    switch (orderStatus) {
      case "pending":
        return <span className="text-[#8a8a1e]">{orderStatus}...</span>;
      case "started":
        return <span className="text-[blue]">{orderStatus}...</span>;

      case "canceled":
        return <span className="text-[red]">{orderStatus}</span>;

      case "completed":
        return <span className="text-[green]">{orderStatus}</span>;

      default:
        return <span>{orderStatus}</span>;
    }
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
                <td className="first:border-l-2 last:border-r-2 first:rounded-l-md last:rounded-r-md py-6 px-4 border-y-2 border-[#C75454]">
                  #{item.id || item._id?.slice(-3)}
                </td>
                <td className="capitalize first:border-l-2 last:border-r-2 first:rounded-l-md last:rounded-r-md py-6 px-4 border-y-2 border-[#C75454]">
                  {item.tableNo}
                </td>
                <td className="capitalize first:border-l-2 last:border-r-2 first:rounded-l-md last:rounded-r-md py-6 px-4 border-y-2 border-[#C75454]">
                  <div className="flex flex-col gap-1">
                    {item.foodList.map((food, i) => {
                      return (
                        <h5 key={i}>
                          {food.name} (x{food.amount})
                        </h5>
                      );
                    })}
                  </div>
                </td>
                <td className="first:border-l-2 last:border-r-2 first:rounded-l-md last:rounded-r-md py-6 px-4 border-y-2 border-[#C75454]">
                  {getDate(item?.createdAt)}
                </td>
                <td className="first:border-l-2 last:border-r-2 first:rounded-l-md last:rounded-r-md py-6 px-4 border-y-2 border-[#C75454]">
                  ${getTotalPrice(item.foodList)}
                </td>
                <td className="capitalize first:border-l-2 last:border-r-2 first:rounded-l-md last:rounded-r-md py-6 px-4 border-y-2 border-[#C75454]">
                  { getTextColorConditionally(item.orderStatus)}
                </td>

                {hideAction === "false" && (
                  <td className="marker:first:border-l-2 last:border-r-2 first:rounded-l-md last:rounded-r-md py-6 px-4 border-y-2 border-[#C75454]">
                    <button
                      onClick={() => deleteListHandler(item._id)}
                      className="group ml-4"
                    >
                      <DeletIcon className="group-hover:stroke-[red]" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>

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
    </>
  );
};

export default OrderListTable;
