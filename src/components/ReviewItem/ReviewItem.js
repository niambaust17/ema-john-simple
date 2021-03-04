import React from 'react';

const ReviewItem = (props) =>
{
    const { name, quantity, img } = props.product;

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
            <br />
            <button>Remove Item</button>
        </div>
    );
};

export default ReviewItem;