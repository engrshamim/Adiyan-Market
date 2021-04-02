import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import ManageProductDetails from '../ManageProductDetails/ManageProductDetails';
import './ManageProduct.css';
const ManageProduct = () => {

    const [manageProduct, setManageProduct] = useState([]);

    useEffect(() => {
        fetch('http://localhost:7000/showProducts')
            .then(res => res.json())
            .then(data => setManageProduct(data))
    }, [manageProduct])

    return (
        <div className="manage-product-area">
            <h3>Manage Product</h3>

            <div className="manage-background">

                <div className='container'>
                    <div className="product-info">
                        <Table hover>
                            <thead>
                                <tr>
                                    <th className='border-left-design'>Product Name</th>
                                    <th>Weight</th>
                                    <th>Price</th>
                                    <th className='border-right-design'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    manageProduct?.map(product => <ManageProductDetails products={product} key={product._id} />)
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default ManageProduct;

{/* <Table bordered hover>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Weight</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{productName}</td>
                        <td>{productWeight}</td>
                        <td>{productPrice}</td>
                        <td>delete</td>
                    </tr>
                </tbody>
            </Table> */}