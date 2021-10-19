import React, { Component } from 'react'
import {connect} from 'react-redux'
import { addProduct, deleteProduct, editProduct } from '../store'
import axios from 'axios';
import AdminProductForm from './AdminProductForm';
/**
 * CLASS COMPONENT
 */

//getting warning about changing controlled input
//TODO: handle errors
const AdminSingleProduct = ({history, product}) => {

        return (
            <div>
                <AdminProductForm history={history} product={product} action={'edit'} />
            </div>
        )
}

const mapState = (state, {match, history}) => {
    return {
      product: state.products.find(product => product.id === match.params.id) || {},
      history: history
    }
}

export default connect(mapState)(AdminSingleProduct)

