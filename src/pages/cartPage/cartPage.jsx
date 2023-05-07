import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './cartPage.css'
import Popup from '../../components/Popup';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/CheckOut';
import { loadStripe } from '@stripe/stripe-js';
function CartPage() {
  const [popup, setPopup] = useState()
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [isCheckout,setIsCheckout]=useState(false)
  const removeFromCart = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
  const rawTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalDiscount = cartItems.reduce((acc, item) => acc + (item.discountPercentage * item.price) / 100 * item.quantity, 0);
  const total = cartItems.reduce((acc, item) => acc + item.new_price * item.quantity, 0);
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  const Checkout = () => {
    if (isLoggedIn) {

      console.log("Checking out...")
      setIsCheckout(true)
    }
    else {
      setPopup(true)

    }
  }
  if (popup === false) {
    setTimeout(() => {
      window.location.href = "/login"
    }, 1000)
  }
  return (

    <div className='cart-container' >
      <p><span className="h2">Shopping Cart </span><span className="p">({cartItems.length} item in your cart)</span></p>



      {cartItems.length === 0 ? (
        <p className='empty'>Your cart is empty.</p>
      ) : (

        <div>


          <div className="cart row " >

            <div className='cart-form col-12 col-md-7 '>
              <table className='cart-table '>
                <thead className='p_title'>

                  <th className='p_img'> </th>
                  <th className='p_name'>Product name</th>
                  <th className='p_price' >Price($)</th>
                  <th   >Quantity</th>
                  <th   >Total($)</th>
                  <th></th>
                </thead>
                {cartItems.map((item, key) => (
                  <tr className='cart_item' key={key}>
                    <td> <Link className='' to={`/product/${item.id}`}> <img className=" cart_img" src={item.thumbnail} alt={item.title} /> </Link> </td>
                    <td >{item.title}</td>
                    <td> {(item.new_price).toFixed(2)} </td>
                    <td >{item.quantity}</td>
                    <td>{(item.new_price * item.quantity).toFixed(2)}</td>
                    <td>  <button className='rm-btn' onClick={() => removeFromCart(item)}><i class="fa fa-trash"></i>
                    </button></td>
                  </tr>
                ))}
              </table>
            </div>
            <div class=" col-5 checkout-container" >

             
                <div className='checkout-form'>
                  <table className='Checkout-table'>
                    <tr>
                      <td className="small text-muted me-2">Total:</td> <th
                        className="lead fw-normal">{rawTotal.toFixed(2)}$</th>
                    </tr>
                    <tr>
                      <td className="small text-muted me-2">Discount:</td>
                      <th
                        className="lead fw-normal">{totalDiscount.toFixed(2)}$</th>
                    </tr>
                    <tr>
                      <td className="small text-muted me-2">Order total:</td> <th
                        className="lead fw-normal">{total.toFixed(2)}$</th>
                    </tr>
                    <tr colspan={2} >
                      <button type="button " onClick={Checkout} className="btn checkout-btn btn-primary btn-md">Checkout</button>
                    </tr>
                  </table>
                </div>
            
            </div>
          </div>
        </div>
      )}
      <Popup trigger={isCheckout} setTrigger={setIsCheckout}>
      <Elements stripe={stripePromise}><CheckoutForm /></Elements>
      </Popup>
      


      <Popup trigger={popup} setTrigger={setPopup}>
        <p><i class="fa  fa-close"></i> You must login to checkout</p>
      </Popup>
    </div>
  )
}

export default CartPage