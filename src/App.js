import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { FoodCardProvider } from "Context/CustomerContext/FoodCardContext";
import { FoodOrderProvider } from "Context/CustomerContext/FoodOrderContext";
import { KitchenContextProvider } from "Context/KitchenContext/KitchenContext";
import { AdminContextProvider } from "Context/AdminContext/AdminContext";

import NotFound from "Pages/NotFound/NotFound";

import CustomerLayout from "Components/Customer/CustomerLayout/CustomerLayout";
import CustomerDashboard from "Components/Customer/CustomerDashboard/CustomerDashboard";
import Home from "Pages/Home/Home";
import ChooseUser from "Pages/ChooseUser/ChooseUser";
import Customer from "Pages/Customer/Customer";
import CUstomerLoginPage from "Pages/Customer/LoginPage/CustomerLoginPage";
import {
  Baverage,
  Backery,
  Breakfast,
  Dessert,
  Lunch,
  Snacks,
} from "Components/Customer/Catogories/Catogories";

import Admin from "Pages/Admin/Admin";
import AdminLayout from "Components/Admin/AdminLayout/AdminLayout";
import AdminDashboard from "Components/Admin/AdminDashboard/AdminDashboard";
import CustomerOrUser from "Components/Admin/Customer-User/CustomerOrUser";
import CustomerList from "Components/Admin/Customer-User/CustomerList";
import CreateCustomer from "Components/Admin/Customer-User/CreateCustomer";
import EditCustomerForm from "Components/UI/Admin/EditCustomerForm/EditCustomerForm";
import AddFoodItem from "Components/Admin/AddFoodItem/AddFoodItem";
import Devices from "Components/Admin/Devices/Devices";
import Categories from "Components/Admin/Categories/Categories";
import CategoriesList from "Components/Admin/Categories/CategoriesList";
import BackeryItems from "Components/Admin/Categories/FoodListTable/BackeryItems";
import DessertsItems from "Components/Admin/Categories/FoodListTable/DessertsItems";
import LunchItems from "Components/Admin/Categories/FoodListTable/LunchItems";
import BreakfastItems from "Components/Admin/Categories/FoodListTable/BreakfastItems";
import BaverageItems from "Components/Admin/Categories/FoodListTable/BaverageItems";
import SnackItems from "Components/Admin/Categories/FoodListTable/SnackItems";
import Orders from "Components/Admin/Orders/Orders";
import FoodItemEditForm from "Components/UI/Admin/EditForm/FoodItemEditForm";

import Kitchen from "Pages/Kitchen/Kitchen";
import KitchenLayout from "Components/Kitchen/KitchenLayout/KitchenLayout";
import FoodOrders from "Components/Kitchen/FoodOrders/FoodOrders";
import CompletedOrders from "Components/Kitchen/CompletedOrders/CompletedOrders";
import CanceledOrders from "Components/Kitchen/CanceledOrders/CanceledOrders";

import CustomerProtectedRoute from "./Routes/CustomerProtectedRoute";
import AdminProtectedRoute from "./Routes/AdminProtectedRoute";
import KitchenProtectedRoute from "./Routes/KitchenProtectedRoute";
import SearchedResult from "Components/Customer/SearchedResult/SearchedResult";
import Checkout from "Components/UI/Customer/Checkout/Checkout";
import SearchFood from "Components/Admin/SearchFood/SearchFood";
import { Toast } from "Components/UI/Toast/Toast";

// import { FoodOrderProvider } from "./Context/CustomerContext/FoodOrderContext.jsx";
import "./App.css";

function App() {
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const maxSupportedWidth = 768; // Change this value according to your application's requirements

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (deviceWidth < maxSupportedWidth) {
    return (
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <div className="text-[3em] font-semibold">Sorry!</div>
        <p className="text-[1.5em] text-center">

        This application does not support this screen size.
        </p>
      </div>
    );
  }

  return (
    <>
      <Toast />
    <FoodCardProvider>
      <FoodOrderProvider>
        <AdminContextProvider>
          <KitchenContextProvider>
            <div>
              <Routes>

                {/* <Route path="/" element={<Home />} /> */}
                {/* <Route path="/chooseuser" element={<ChooseUser />} /> */}
                <Route path="/kitchen/login" element={<Kitchen />} />
                <Route path="/admin/login" element={<Admin />} />

                {/* <Route path="/customer" element={<Customer />} />
                <Route
                  path="/customer/login/:tableId"
                  element={<CUstomerLoginPage />}
                /> */}

                <Route path="/customer/:tableId/*" element={<CustomerLayout />}>
                  <Route path="" element={<CustomerDashboard />} />
                  <Route path="bakery" element={<Backery />} />
                  <Route path="beverages" element={<Baverage />} />
                  <Route path="breakfast" element={<Breakfast />} />
                  <Route path="desserts" element={<Dessert />} />
                  <Route path="lunch" element={<Lunch />} />
                  <Route path="snacks" element={<Snacks />} />
                  <Route path=":foodname" element={<SearchedResult />} />
                </Route>

                <Route
                  path="/kitchen"
                  element={
                    <KitchenProtectedRoute>
                      <KitchenLayout />
                    </KitchenProtectedRoute>
                  }
                >
                  <Route path="orders" element={<FoodOrders />} />
                  <Route path="completed" element={<CompletedOrders />} />
                  <Route path="canceled" element={<CanceledOrders />} />
                </Route>

                <Route
                  path="/admin"
                  element={
                    <AdminProtectedRoute>
                      <AdminLayout />
                    </AdminProtectedRoute>
                  }
                >
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="customers" element={<CustomerOrUser />}>
                    <Route path="" element={<CustomerList />} />
                    <Route
                      path="create-customer"
                      element={<CreateCustomer />}
                    />
                    <Route path="editcustomer" element={<EditCustomerForm />} />
                  </Route>
                  <Route path="addfooditem" element={<AddFoodItem />} />
                  <Route path="addfooditem" element={<AddFoodItem />} />
                  <Route path="devices" element={<Devices />} />
                  <Route path="categories" element={<Categories />}>
                    <Route path="" element={<CategoriesList />} />
                    <Route path="bakery" element={<BackeryItems />} />
                    <Route path="desserts" element={<DessertsItems />} />
                    <Route path="lunch" element={<LunchItems />} />
                    <Route path="breakfast" element={<BreakfastItems />} />
                    <Route path="beverages" element={<BaverageItems />} />
                    <Route path="snacks" element={<SnackItems />} />
                  </Route>
                  <Route path="orders" element={<Orders />} />
                  <Route path="searchfood/:foodname" element={<SearchFood />} />
                  <Route path="editfood" element={<FoodItemEditForm />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </KitchenContextProvider>
        </AdminContextProvider>
      </FoodOrderProvider>
    </FoodCardProvider>
    </>
  );
}

export default App;
