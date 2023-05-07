import React from 'react';
import './Checkout.css';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const userLogin = JSON.parse(localStorage.getItem('userlogin'))
    const cartItems= JSON.parse(localStorage.getItem('cart')) || [];
    const total = cartItems.reduce((acc, item) => acc + item.new_price * item.quantity, 0);

    console.log(userLogin)
    const initialValues = {
        fullName: `${userLogin.fullName}`,
        email: `${userLogin.email}`,
        phone: `${userLogin.phone}`,
        address: `${userLogin.address}`,
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        const { error, paymentMetdod } = await stripe.createPaymentMetdod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
    };

    return (
        <div className='Checkout-popup'> 
        
            <div className="checkout__header">
                <h2>Checkout</h2>
            </div>
            
        <form onSubmit={handleSubmit}>
            <table>

                <tr>


                    <td> Full Name: </td>
                    <td>
                        <span>
                            {userLogin.fullName}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td> Phone number: </td>
                    <td>
                        <span>
                            {userLogin.phone}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td> Email: </td>
                    <td>
                        <span>
                            {userLogin.email}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td> Address: </td>
                    <td>
                        <span>
                            {userLogin.address}
                        </span>
                    </td>
                </tr>
                <tr>
                <td> Total: </td>
                <td>
                    <span>
                        {total.toFixed(2)} $
                    </span>
                </td>
            </tr>

            </table>





            <CardElement />
            <div className='pay-btn'> 
            <button  type="submit" disabled={!stripe || !elements}>
                Pay
            </button>
            </div>
        </form>
        </div>
    );
};
export default CheckoutForm