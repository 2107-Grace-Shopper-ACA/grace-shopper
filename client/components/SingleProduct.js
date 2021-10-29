import React, {useState} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import {createOrder, createOrderItem, editOrderItem} from '../store'
import {Button, Box, Grid,Typography, CardActionArea, CardActions, CardContent, Card, CardMedia, InputLabel, MenuItem, FormControl, TextField, Select} from '@material-ui/core'
import AddShoppingCart from '@material-ui/icons/AddShoppingCart'
import IconButton from '@material-ui/core/IconButton';
import ProductCardSingle from "./ProductCardSingle";

const SingleProduct = ({products, match, orders, auth, orderItems, createOrder, createOrderItem, editOrderItem}) => {
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