import React, { useContext, useEffect, useState } from 'react';
import './Checkout.css';
import { Container, Table } from 'react-bootstrap';
import Header from './../Header/Header';
import { useHistory, useParams } from 'react-router';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';

const Checkout = () => {

    const { id } = useParams();
    console.log('paramsid', id);

    const [product, setProduct] = useState();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    useEffect(() => {

        fetch(`http://localhost:7000/product/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [])
    console.log('products', product);

    console.log('name,price', product?.productName, product?.productPrice);

    let productName = product?.productName;
    let productPrice = product?.productPrice;
    let productWeight = product?.productWeight;

    let history = useHistory();

    const [checkOutIn, setCheckOutIn] = useState(true);

    const handleCheckOut = () => {
        const date = new Date();
        const orderTime = date.toLocaleDateString() + " " + date.toLocaleTimeString();
        const order = { ...product, ...loggedInUser, orderTime }
        fetch('http://localhost:7000/addOrder', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
        })
            .then(res => console.log('order database', res))

        // history.push(`/confirmedOrder/${id}`)
        setCheckOutIn(false)
    }

    const handleSeeOrderBtn = () => {
        history.push('/orders')
    }

    return (
        <>
            {
                checkOutIn ?
                    <>
                        <Header></Header>

                        <Container>
                            <h3 className='checkout-title'>Checkout</h3>
                            <Table bordered hover className='table-section'>
                                <thead>
                                    <tr>
                                        <th>Description</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>{productName}</td>
                                        <td>$ {productPrice}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2">Total</td>
                                        <td>$ {productPrice}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <div className="checkout-btn text-right">
                                <button onClick={handleCheckOut} className="btn btn-success">
                                    Checkout
                        </button>
                            </div>
                        </Container>
                    </>
                    :

                    <div className='bg-confirm'>
                       
                        <Container>
                        <Link to="/" className='header-title navbar-brand title-set'>Bhuiyan's Grocery</Link>
                            <div className="confirm-box">
                                <h3> &#10004; Your Order is Confirmed</h3>
                                <div className="product-details">
                                    <Table>
                                        <tbody>
                                            <tr>
                                                <td colSpan="2">Product Name</td>
                                                <td colSpan="2"> {productName} </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">Product Price</td>
                                                <td colSpan="2"> {productPrice} </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">Product Quantity</td>
                                                <td colSpan="2"> 1 </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">Weight</td>
                                                <td colSpan="2"> {productWeight} </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">Order Time</td>
                                                <td colSpan="2">  {
                                                    new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
                                                } </td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2">Total Price</td>
                                                <td colSpan="2"> {productPrice} </td>
                                            </tr>

                                        </tbody>
                                    </Table>
                                    <button onClick={handleSeeOrderBtn} className="btn buy-btn">
                                        see your all orders
                                    </button>
                                </div>
                            </div>
                        </Container>
                    </div>

            }
        </>
    );
};

export default Checkout;