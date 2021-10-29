import React from "react";
import { connect } from "react-redux";
import {createOrder, createOrderItem, editOrderItem} from '../store'
import ProductCardSingle from "./ProductCardSingle";

const SingleProduct = ({products, match}) => {
    const product = products.find(product => product.id === match.params.productId)

    if (!product) return '...loading'

    return (
        <ProductCardSingle product={product} style={{maxWidth: 500, margin: '2rem'}}/>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
      createOrder: (user) => {
        dispatch(createOrder(user))
      },
      createOrderItem: (product) => {
        dispatch(createOrderItem(product))
      },
      editOrderItem: (orderItem) => {
        dispatch(editOrderItem(orderItem))
      }
    }
  }

export default connect((state) => state, mapDispatchToProps)(SingleProduct);