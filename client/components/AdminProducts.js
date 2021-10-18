import React, { Component } from 'react'
import {connect} from 'react-redux'
import { loadProducts } from '../store'

/**
 * CLASS COMPONENT
 */
const AdminProducts = ({ products, addProduct, deleteProduct }) => {
    
    return (
        <div id="product-gallery">
            {products.map((product) => {
                return (
                <div key={product.id}>
                    <h4>{product.name}</h4>
                    <img src={product.imageUrl || "https://i.gifer.com/MNu.gif"}></img>
                </div>
                );
            })}
        </div>    
    )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
    return {
        deleteProduct: (id) => dispatch(deleteProduct(id)),
        addProduct: (product) => dispatch(addProduct(product))
    }
}

export default connect(mapState, mapDispatch)(AdminProducts)
