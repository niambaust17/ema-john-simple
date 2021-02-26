import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
const Product = (props) =>
{
    const { name, seller, img, price, stock } = props.product;
    return (
        <div className="single-product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h3 style={{ color: 'orange' }}>{name}</h3>
                <p>by {seller}</p>
                <h3>$ {price}</h3>
                <p>only {stock} left in stock - order soon</p>
                <button onClick={() => props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>
            </div>
        </div>
    );
};

export default Product;