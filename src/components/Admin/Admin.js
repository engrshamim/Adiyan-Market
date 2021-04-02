import React, { useState } from 'react';
import './Admin.css';
import { Col, Nav, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Header from '../Header/Header';


const Admin = () => {

    const { register, handleSubmit, watch, errors } = useForm();

    const [imgUrl, setImgUrl] = useState(null);

    const imageUpload = (e) => {
        console.log(e.target.files[0]);

        const imgData = new FormData();
        imgData.set('key', '879a758c310c8e7c6b03f634e3cafb92');
        imgData.append('image',e.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', 
        imgData)
            .then(function (response) {
               setImgUrl(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onSubmit = data => {
        console.log(data);
        const productData = {
            productName: data.productName,
            productPrice: data.productPrice,
            productUrl: imgUrl,
            productWeight: data.productWeight
        }
        console.log('p',productData);
        fetch('http://localhost:7000/addProduct',{
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(productData)
        })
        .then(res => res.json())
        .then(data => console.log("server res",data))
    };

    return (
        <div>
            
            <Row>
                <Col md={4} className='margin'>

                    <div className="nav-area">
                        <h2 className='mb-4'>Adiyan Market</h2>
                        <Nav defaultActiveKey="/home" className="flex-column">
                            <Nav.Link href="/homes">Manage Product</Nav.Link>
                            <Nav.Link eventKey="link-1">Add Product</Nav.Link>
                        </Nav>
                    </div>

                </Col>
                <Col md={8} className='margin'>
                    <h4 className='add-title'> Add Product </h4>
                    <div className="form-area">
                        <div className='form-section'>
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <label>Product Name</label>
                                <input name="productName" className='form-control' placeholder='name' ref={register({ required: true })} />
                                {errors.exampleRequired && <span>This field is required</span>}

                                <label>Weight</label>
                                <input name="productWeight" className='form-control' placeholder='name' ref={register({ required: true })} />
                                {errors.exampleRequired && <span>This field is required</span>}

                                <label>Add Price</label>
                                <input name="productPrice" type='number' className='form-control' placeholder='price' ref={register({ required: true })} />
                                {errors.exampleRequired && <span>This field is required</span>}
                                
                                <label>Add Photo</label>
                                <input type='file' name="exampleRequired" onChange={imageUpload} className='fileUpload d-block'  />
                              

                                <input type="submit" className='btn btn-success px-5 py-2 mt-4' value='Save' />
                            </form>
                        </div>
                    </div>

                </Col>
            </Row>
        </div>
    );
};

export default Admin;