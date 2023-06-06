import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registeration from "./pages/Registeration";
import UserProfile from "./pages/UserProfile"
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CartMenu from "./components/CartMenu";
import Checkout from "./pages/Checkout";
import LayoutWrapper from "./pages/LayoutWrapper";
import ProductDisplay from "./pages/ProductDisplay";
import ProductsListPage from "./pages/ProductsListPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWrapper/>} >
          <Route path="/" element={<Home/>} />
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Registeration/>}/>
          <Route path="forgotpassword" element={<ForgotPassword/>}/>
          <Route path="resetpassword/:resetToken" element={<ResetPassword/>}/>
          <Route path="profile" element={<UserProfile/>}/>
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="product/:id" element={<ProductDisplay/>}/>
          <Route path="category/:category" element={<ProductsListPage/>}/>
          <Route path="brands/:brand" element={<ProductsListPage/>}/>

          <Route path="search/:searchQuery" element={<ProductsListPage/>}/>

        </Route>

      </Routes>
      <CartMenu/>
      <ToastContainer/>
    </>
  );
}

export default App;