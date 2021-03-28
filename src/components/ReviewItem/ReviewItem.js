import React from 'react';

const ReviewItem = (props) =>
{
    const { name, quantity, img, key, price } = props.product;

    const reviewItem = {
        borderBottom: '1px solid gray',
        marginBottom: '15px',
        paddingBottom: '5px',
        marginLeft: '100px'
    }
    return (
        <div style={reviewItem}>
            <img src={img} alt="" />
            <h4>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>${price}</small></p>
            <br />
            <button onClick={() => props.removeProduct(key)}>Remove Item</button>
        </div>
    );
};

export default ReviewItem;