import React, { useContext } from 'react';
import './Shipment.css';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () =>
{
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data =>
    {
        console.log(data)
        const savedCart = getDatabaseCart();
        const orderDetails = { ...loggedInUser, products: savedCart, shipment: data, orderTime: new Date() }

        fetch('http://localhost:5000/addOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data =>
            {
                if (data)
                {
                    processOrder();
                    alert('Order Placed');
                }
            })
    };

    console.log(watch("example")); // watch input value by passing the name of it

    return (
        < form className="ship-form" onSubmit={handleSubmit(onSubmit)} >
            < input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Name" />
            { errors.name && <span className="error">Name is required</span>}
            < input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Email" />
            { errors.email && <span className="error">Email is required</span>}
            < input name="address" ref={register({ required: true })} placeholder="Address" />
            { errors.address && <span className="error">Address is required</span>}
            < input name="phone" ref={register({ required: true })} placeholder="Phone" />
            { errors.phone && <span className="error">Phone Number is required</span>}
            <input type="submit" />
        </ form>
    );
};

export default Shipment;