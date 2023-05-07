import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from './pages/Home/Home';
import './App.css';

import Login from './pages/Login/login';
import Register from './pages/register/register';
import ProfileForm from './pages/profile/profile';
import ProductSearch from './pages/productSearch/productSearch';
import Header from "./components/header";
import Footer from "./components/footer";
import CartPage from "./pages/cartPage/cartPage"
import ProductDetail from "./pages/productDetail/productDetail";
import { Helmet } from 'react-helmet';
function App() {

  return (
    <div>
    <Helmet>
        <title>Eco Shop</title>
        <meta name="description" content="trang thương mại điện tử số 1 Việt Nam" />
      </Helmet>
      <Router>
        <Header />
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/search/:searchTerm" element={<ProductSearch />} />
          <Route path="/register" element={<Register />} />
          <Route path="/editProfile" element={<ProfileForm />} />

          <Route path="/cart" element={<CartPage />} />
        </Routes>
        <Footer />
      </Router>




    </div>
  );
}
export default App;