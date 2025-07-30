import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";


import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Menu from "./components/Menu/Menu";
import ContactUs from "./components/ContactUs/ContactUs";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import UserProfile from "./components/UserProfile/UserProfile";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import PaymentPage from "./components/PaymentModal/PaymentModal";
import Dashboard from "./components/Dashboard/Dashboard";
import Cart from "./components/Cart/Cart";
import AddMeal from "./components/AddMeal/AddMeal";
import DeleteMeal from "./components/DeleteMeal/DeleteMeal";
import UpdateMeal from "./components/UpdateMeal/UpdateMeal";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Admin from "./components/Admin/Admin";
import NavAdmin from "./components/NavAdmin/NavAdmin";
import { UserProvider } from "./UserContext";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="menu" element={<Menu />} />
          <Route path="category" element={<Menu />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<SignUp />} />
          <Route path="userAccount" element={<UserProfile />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="product-info" element={<ProductInfo />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <>
              <NavAdmin />
              <Admin />
            </>
          }
        >
          <Route path="dashboard" index element={<Dashboard />} />
          <Route path="add-meal" element={<AddMeal />} />
          <Route path="update-meal" element={<UpdateMeal />} />
          <Route path="delete-meal" element={<DeleteMeal />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
