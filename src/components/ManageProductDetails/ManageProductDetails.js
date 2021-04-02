import React from 'react';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ManageProductDetails = ({ products }) => {

    const { productName, productPrice, productWeight, _id } = products;

    const deleteProduct = (id) => {

        fetch(`http://localhost:7000/deleteProduct/${id}`,{
            method:'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            console.log('dekete es')
            if(result){
               console.log('delete_success');
            //    event.target.parentNode.parentNode.style.display = 'none';
            }
        })
        .then(err => console.log('object',err))
    }

    return (

        <tr>
            <td>{productName}</td>
            <td>{productWeight}</td>
            <td>{productPrice}</td>
            <td>
                <button onClick={() => deleteProduct(_id)} className='btn delete-btn'>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </td>
        </tr>

    );
};

export default ManageProductDetails;