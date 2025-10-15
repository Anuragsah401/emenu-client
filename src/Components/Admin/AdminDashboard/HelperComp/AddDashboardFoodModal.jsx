import React, { useState, useEffect } from "react";

import Modal from "Components/UI/Modal/Modal";

import { DragDropContext } from "react-beautiful-dnd";

import FoodListColumn from "./FoodListColumn";

import { useAdminContext } from "Context/AdminContext/AdminContext";

import axios from "axios";

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

  const [isLoading, setIsLoading] = useState(false);

  const [tab, setTab] = useState("bakery");

  const foodTabData = [
    "bakery",
    "beverages",
    "breakfast",
    "desserts",
    "lunch",
    "snacks",
  ];

  useEffect(() => {
    let category;

    switch (tab) {
      case "bakery":
        category = "bakery";
        break;
      case "baverages":
        category = "beverages";
        break;
      case "breakfast":
        category = "breakfast";
        break;
      case "lunch":
        category = "lunch";
        break;
      case "desserts":
        category = "desserts";
        break;
      case "snacks":
        category = "snacks";
        break;
      default:
        category = "";
    }
    setIsLoading(true);
    axios
      .get("/api/food")
      .then((res) => {

        const filteredFood = res?.data.filter(item => item.category === category)
        
        let matchingObjects = filteredFood.filter((obj1) => {
          return addedFoodData.some(
            (obj2) => obj1._id === obj2._id && obj1.name === obj2.name
          );
        });

        let filteredArr1 = filteredFood.filter(
          (obj) => !matchingObjects.includes(obj)
        );

        setFoodData(filteredArr1);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [addedFoodData, tab]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      foodSource = foodData,
      foodDestination = addedFoodData;

    // Source Logic
    if (source.droppableId === "foodList") {
      add = foodSource[source?.index];
      foodSource?.splice(source?.index, 1);
     
    } else {
      add = foodDestination[source?.index];
      foodDestination.splice(source?.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "foodList") {
      foodSource?.splice(destination.index, 0, add);
    
    } else {
      foodDestination.splice(0, 0, add);
    }

    setAddedFoodData(foodDestination);
    setFoodData(foodSource);

    // done to prevent post request to database if destination items dragged in its own position
    if(source.droppableId === "foodList"){
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

    await axios.delete(routeApi + id).catch((err) => console.log(err));

    const deleted = addedFoodData.filter((item) => item._id !== id);
    setAddedFoodData(deleted);

    if (modalTitle === "Add Special Food") {
      setTodaysSpecialTableData(deleted);
    } else if (modalTitle === "Add Recommended Food") {
      setrecommendedTableData(deleted);
    } else {
      setMostPopularTableData(deleted);
    }
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
    console.log(routeApi);

    await axios
      .post(routeApi, foods[0])
      .then((res) => {
        
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  return (
    <Modal setModal={setModal} modal={modal}>
      <div className="py-2 md:w-[700px] xl:w-[900px]">
        <h1 className="text-[2em] shadow-md">{modalTitle}</h1>
        <div className="mt-5 flex justify-between px-8 flex-wrap">
          {foodTabData.map((item, index) => {
            return (
              <button
                onClick={() => setTab(item)}
                style={
                  tab === item
                    ? { backgroundColor: "#c75454", color: "#fff" }
                    : null
                }
                key={`tab ${index}`}
                className="list-none capitalize p-4 shadow-md rounded-md hover:bg-[#c75454] hover:text-[#fff]"
              >
                {item}
              </button>
            );
          })}
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="border border-black rounded-md mx-5 mt-6 flex flex-wrap">
            <div className="w-[50%] border-r border-black ">
              <h1 className="shadow-md py-3 mb-2">Drag Items From Here!</h1>
              <FoodListColumn
                foodData={foodData}
                droppableId="foodList"
                disableDrop={true}
                title="Drag Items"
                setFoodData={setFoodData}
                isLoading={isLoading}
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
