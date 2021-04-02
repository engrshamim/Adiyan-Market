// import React, { useEffect, useState } from 'react';
// import { Container, Table } from 'react-bootstrap';
// import { useHistory, useParams } from 'react-router';
// import './ConfirmedOrder.css';

// const ConfirmedOrder = () => {
//     const { id } = useParams();
//     console.log(id);
//     const [confirmProduct, setConfirmProduct] = useState({});

//     useEffect(() => {

//         fetch(`http://localhost:7000/product/${id}`)
//             .then(res => res.json())
//             .then(data => setConfirmProduct(data))
//     }, [])

//     const { productName,productPrice} = confirmProduct;
//     let history = useHistory();
//     const handleSeeOrderBtn = () => {
//         history.push('/orders')
//     }
//     return (
//         <div className='bg-confirm'>
//             <Container>
//                 <div className="confirm-box">
//                     <h3> &#10004; Your Order is Confirmed</h3>
//                     <div className="product-details">
//                         <Table>
//                             <tbody>
//                                 <tr>
//                                     <td colSpan="2">Product Name</td>
//                                     <td colSpan="2"> {productName} </td>
//                                 </tr>
//                                 <tr>
//                                     <td colSpan="2">Product Price</td>
//                                     <td colSpan="2"> {productPrice} </td>
//                                 </tr>
//                                 <tr>
//                                     <td colSpan="2">Product Quantity</td>
//                                     <td colSpan="2"> 1 </td>
//                                 </tr>
//                                 <tr>
//                                     <td colSpan="2">Order Time</td>
//                                     <td colSpan="2">  {
//                                         new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
//                                     } </td>
//                                 </tr>
//                                 <tr>
//                                     <td colSpan="2">Total Price</td>
//                                     <td colSpan="2"> {productPrice} </td>
//                                 </tr>
                                
//                             </tbody>
//                         </Table>
//                         <button onClick={handleSeeOrderBtn} className="btn buy-btn">
//                             see your all orders 
//                         </button>
//                     </div>
//                 </div>
//             </Container>
//         </div>
//     );
// };

// export default ConfirmedOrder;