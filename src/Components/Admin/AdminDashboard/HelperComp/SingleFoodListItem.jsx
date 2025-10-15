import React from "react";


const SingleFoodListItem = ({ provided, item, showDeleteIcon, deleteListHandler, droppableId }) => {
  
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      key={item._id}
      className="xl:w-[120px] xl:h-[100px] relative md:w-[95px] md:h-[90px]"
    >
      <img
        src={`http://localhost:4000/${item.img}`}
        alt={item.name}
        className="w-full h-full object-fit rounded-md"
      />
      {item.name}

      {showDeleteIcon ? (
        <div onClick={()=> deleteListHandler(item._id)} className="absolute w-5 h-5 flex justify-center items-center -top-1 -right-1 bg-black text-white rounded-full cursor-pointer hover:bg-red-600">
          x
        </div>
      ) : null}
    </div>
  );
};

export default SingleFoodListItem;
