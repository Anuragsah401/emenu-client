import React, { useState, useEffect } from "react";
import Modal from "Components/UI/Modal/Modal";
import { DragDropContext } from "react-beautiful-dnd";
import FoodListColumn from "./FoodListColumn";
import { useAdminContext } from "Context/AdminContext/AdminContext";
import { useAxios } from "Hooks/useAxios";

const AddDashboardFoodModal = ({ setModal, modal }) => {
  const {
    modalTitle,
    addedFoodData,
    setAddedFoodData,
    setTodaysSpecialTableData,
    setMostPopularTableData,
    setrecommendedTableData,
  } = useAdminContext();

  const [foodData, setFoodData] = useState([]);
  const [tab, setTab] = useState("bakery");
  const foodTabData = ["bakery", "beverages", "breakfast", "desserts", "lunch", "snacks"];

  const { response, error, loading, fetchData } = useAxios({}); // useAxios hook

  // Fetch food items whenever tab changes or addedFoodData changes
  useEffect(() => {
    const fetchCategoryFood = async () => {
      let category = tab;
      const res = await fetchData({ url: "/api/food", method: "GET" });

      if (res) {
        const filteredFood = res.filter((item) => item.category === category);

        const matchingObjects = filteredFood.filter((obj1) =>
          addedFoodData.some((obj2) => obj1._id === obj2._id && obj1.name === obj2.name)
        );

        const filteredArr = filteredFood.filter((obj) => !matchingObjects.includes(obj));
        setFoodData(filteredArr);
      }
    };

    fetchCategoryFood();
  }, [tab, addedFoodData]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

    let add, foodSource = [...foodData], foodDestination = [...addedFoodData];

    if (source.droppableId === "foodList") {
      add = foodSource.splice(source.index, 1)[0];
    } else {
      add = foodDestination.splice(source.index, 1)[0];
    }

    if (destination.droppableId === "foodList") {
      foodSource.splice(destination.index, 0, add);
    } else {
      foodDestination.splice(destination.index, 0, add);
    }

    setAddedFoodData(foodDestination);
    setFoodData(foodSource);

    // POST to backend only if dragging from foodList
    if (source.droppableId === "foodList") {
      addFoodHandler(foodDestination);
    }
  };

  const deleteListHandler = async (id) => {
    let routeApi = "";
    switch (modalTitle) {
      case "Add Most Popular Food":
        routeApi = "/api/mostpopularfood/";
        break;
      case "Add Recommended Food":
        routeApi = "/api/recommendedfood/";
        break;
      case "Add Special Food":
        routeApi = "/api/todaysspecial/";
        break;
      default:
        routeApi = "";
    }

    await fetchData({ url: routeApi + id, method: "DELETE" });

    const deleted = addedFoodData.filter((item) => item._id !== id);
    setAddedFoodData(deleted);

    if (modalTitle === "Add Special Food") setTodaysSpecialTableData(deleted);
    else if (modalTitle === "Add Recommended Food") setrecommendedTableData(deleted);
    else setMostPopularTableData(deleted);
  };

  const addFoodHandler = async (foods) => {
    let routeApi = "";
    switch (modalTitle) {
      case "Add Most Popular Food":
        routeApi = "/api/mostpopularfood";
        break;
      case "Add Recommended Food":
        routeApi = "/api/recommendedfood";
        break;
      case "Add Special Food":
        routeApi = "/api/todaysspecial";
        break;
      default:
        routeApi = "";
    }

    if (foods.length === 0) return;
    await fetchData({ url: routeApi, method: "POST", body: foods[0] });
  };

  return (
    <Modal setModal={setModal} modal={modal}>
      <div className="py-2 md:w-[700px] xl:w-[900px]">
        <h1 className="text-[2em] shadow-md">{modalTitle}</h1>
        <div className="mt-5 flex justify-between px-8 flex-wrap">
          {foodTabData.map((item, index) => (
            <button
              onClick={() => setTab(item)}
              style={tab === item ? { backgroundColor: "#c75454", color: "#fff" } : null}
              key={`tab-${index}`}
              className="list-none capitalize p-4 shadow-md rounded-md hover:bg-[#c75454] hover:text-[#fff]"
            >
              {item}
            </button>
          ))}
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="border border-black rounded-md mx-5 mt-6 flex flex-wrap">
            <div className="w-[50%] border-r border-black">
              <h1 className="shadow-md py-3 mb-2">Drag Items From Here!</h1>
              <FoodListColumn
                foodData={foodData}
                droppableId="foodList"
                disableDrop={true}
                title="Drag Items"
                setFoodData={setFoodData}
                isLoading={loading}
              />
            </div>

            <div className="w-[50%]">
              <h1 className="shadow-md py-3 mb-2">Drop Items here!</h1>
              <FoodListColumn
                foodData={addedFoodData}
                droppableId="AddedfoodList"
                showDeleteIcon
                title="Drop Items"
                deleteListHandler={deleteListHandler}
              />
            </div>
          </div>
        </DragDropContext>
      </div>
    </Modal>
  );
};

export default AddDashboardFoodModal;
