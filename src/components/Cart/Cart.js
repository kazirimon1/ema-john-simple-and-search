import React from 'react';
import "./Cart.css"

const Cart = (props) => {
    const { cart } = props
    // console.log(cart);


    let total = 0;
    let shipping = 0;
    let quantity = 0;
    for (const product of cart) {
        quantity = quantity + product.quantity
        total = total + product.price * product.quantity
        shipping = shipping + product.shipping
    }
    const tax = parseFloat((total * 10 / 100).toFixed(2))
    const grandTotal = total + shipping + tax
    return (
        <div className='cart'>
            <h1>Order Summary</h1>
            <p>Selected Items : {quantity}</p>
            <p>Total Price : <b>$</b> {total}</p>
            <p>Total Shipping : $ {shipping}</p>
            <p>tax : $ {tax.toFixed(2)}</p>
            <h2>Grand Total :$ {grandTotal.toFixed(2)}</h2>
        </div>
    );
};

export default Cart;