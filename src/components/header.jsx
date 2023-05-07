import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartSimple } from "phosphor-react";
import logo from '../assets/logo.png';
import axios from 'axios';
import './headers.css';
import Popup from './Popup';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState();
  const [popup1, setPopup1] = useState(false);
  const [popup2, setPopup2] = useState(false);
  const navigate = useNavigate();
  
  let isLoggedIn = localStorage.getItem('isLoggedIn') 
  const handleSubmit = event => {
    event.preventDefault();
    if (searchTerm) {
      // Chuyển hướng đến trang Search và truyền giá trị searchTerm trong URL
      navigate(`/search/${searchTerm}`);
    }
  };
  useEffect(() => {
    try {
      axios.get('https://dummyjson.com/products?limit=10')
        .then(response => {
          setProducts(response.data.products);

        })
    }
    catch (error) {
      console.log(error);
    }
  }, []);
  const Logout = () => {
    if (isLoggedIn){

      localStorage.removeItem('isLoggedIn',isLoggedIn);
      localStorage.removeItem('userlogin');
      setPopup1(true);
      setTimeout(function(){
    
    window.location.href="/";
      },1000)
   
  }
    else {
      setPopup2(true);
      setTimeout(function(){
    
    window.location.href="/";
      },1000)
    }

  
}
const editProfile = () => {
  if(isLoggedIn){
  window.location.href = "/editprofile";
}
else{
  setPopup2(true);
      setTimeout(function(){
    
    window.location.href="/";
      },1000)
}
}
const account = ()=>
{
  if(isLoggedIn){
  window.location.href = "/editprofile";}
  else{
  
  window.location.href="/login";
}
}
return (
  <div className='navs '>
    <span class=" navbar-toggler-icon btn-header sidebar_btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">☰</span>

    <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Account</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body  ">
        <button href="/editProfile"  onClick={editProfile} class="btn item"> Edit account infomation</button>
        <button onClick={Logout} className=' btn btn_logout item'> Log out</button>
      </div>
    </div>
    <div className="logo col-12 col-sm-2">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
    </div>
    <div className="nav col-12 col-sm-10 row">
      <div className=' topnav d-flex justify-content-around'>
        <Link to="/" className='home-btn'>
          <p type="submit" class="  btn-header "><i class="fa fa-home" > Home</i></p>
        </Link>
        <form className="d-flex search" onSubmit={handleSubmit}>
          <div class="  search-group  abc bg-light rounded rounded-pill ">
            <div class="input-group  ">
              <input type="search"
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)} placeholder="Nhập sản phẩm bạn cần tìm"
                aria-describedby="button-addon1" class="seach-btn rounded rounded-pill border-0 bg-light" />
              <div class="input-group-append">
                <button id="button-addon1" type="submit" class="btn btn-link text-primary"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div>
        </form>
        <div className=" login-cart">
          <Link to="/login">
            <p onClick={account} class="  btn-header login-btn"><i class="fa fa-sign-in"> Tài khoản</i></p>
          </Link>

          <Link to="/cart">
            <span type="submit" class=" btn-header cart-btn"><ShoppingCartSimple size={30} /> </span>
          </Link>
        </div>
      </div>

      <div className='d-flex titles justify-content-between  column '>
        {products?.map((product, index) => (

          <Link className='text-black list-title' to={`/search/${product.title}`}>
            <div className='cardViewContainer' key={index}>

              <p className='item '> {product.title}</p>

            </div>
          </Link>
        ))}
      </div>

    </div>
    <Popup trigger={popup2} setTrigger={setPopup2} >
        <p><i class="fa fa-exclamation"></i> You must login fist</p>
      </Popup> 

    <Popup trigger={popup1} setTrigger={setPopup1} >
        <p><i class="fa check fa-check"></i>Logout success</p>
      </Popup>
  </div>

);
}

export default Header;