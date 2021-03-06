import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
const ProductDetail = () =>
{
    const { productKey } = useParams();

    const [product, setProduct] = useState({});
    useEffect(() =>
    {
        fetch('https://pacific-journey-18158.herokuapp.com/product/' + productKey)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [productKey])

    return (
        <div>
            <h1>Your Product Detail</h1>
            <Product showAddToCart={false} product={product} />
        </div>
    );
};

export default ProductDetail;