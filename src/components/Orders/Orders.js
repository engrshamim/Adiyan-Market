import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import OrderDetails from '../OrderDetails/OrderDetails';
import './Orders.css';
import Header from './../Header/Header';

const Orders = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [orderedProducts, setOrderedProducts] = useState([]);


    useEffect(() => {
        const email = loggedInUser?.email;
        console.log('email', email);
        fetch(`http://localhost:7000/showOrdersProduct/${email}`)
            .then(res => res.json())
            .then(data => setOrderedProducts(data))

    }, [])
    console.log('order', orderedProducts);
    const { photoURL, name, email } = loggedInUser;
    return (
        <div className='order-wrapper'>
            <Header></Header>
            <div className="order-details">
                <div className='container'>
                    <div className="login-user-details">
                        <img src={photoURL} alt="" />
                        <h3>{name}</h3>
                        <h4>{email}</h4>
                        <h5>Total Order: {orderedProducts.length}</h5>
                    </div>

                    {
                        orderedProducts.length ? <h3 className='order-details-title'>Orders Items Information: </h3>
                            : ''
                    }

                    <div className="row">

                        {
                            orderedProducts?.map(orderProduct => <OrderDetails orderProduct={orderProduct} key={orderProduct._id} />)
                        }
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Orders;