import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import ShowProducts from '../ShowProducts/ShowProducts';
import Header from './../Header/Header';

const Home = () => {

    const [products, setpProducts] = useState([])
    const [spinner, setSpinner] = useState(true);
    useEffect(() => {

        fetch('http://localhost:7000/showProducts')
            .then(res => res.json())
            .then(data => {
                setpProducts(data);
                setSpinner(false)
            })

    }, [])

    console.log('home products', products);
    return (
        <div style={{ 'background': '#F8EEDC' }}>
            <Header></Header>

            <Container className='py-4 text-center'>
                {
                    spinner ? <Spinner animation="border" variant="danger" />
                        :
                        <Row>
                            {
                                products.map(product => <ShowProducts products={product} key={product._id} />)
                            }
                        </Row>
                }
            </Container>


        </div>
    );
};

export default Home;