import React from 'react';
import './Cart.css'
const Cart = (props) =>
{
    const totalPrice = props.cart.reduce((total, pd) => total + (pd.price * (pd.quantity || 1)), 0);
    let shipping = 0;
    if (totalPrice > 500)
    {
        shipping = 0;
    }
    else
    {
        shipping = totalPrice * .05;
    }
    const fixedNumber = num =>
    {
        return Number(num.toFixed(2));
    }
    return (
        <div className="cart-container">
            <h1 style={{ textAlign: 'center' }}>Order Summary</h1>
            <h3 style={{ textAlign: 'center' }}>Items ordered:{props.cart.length}</h3>
            <pre>
                <h4>Items:                                     ${fixedNumber(totalPrice)}</h4>
                <h4>Shipping Handling:                         ${fixedNumber(shipping)}</h4>
                <h4>Total before Tax:                          ${fixedNumber((totalPrice + shipping))}</h4>
                <h4>Tax:                                       ${fixedNumber((totalPrice + shipping) * .1)}</h4>
                <h4>Order Total:                               ${fixedNumber((totalPrice + shipping) + ((totalPrice + shipping) * .1))}</h4>
            </pre>
            {
                props.children
            }
        </div >
    );
};

export default Cart;