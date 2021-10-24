import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { useHistory } from "react-router";
import {createOrder, createOrderItem, editOrderItem} from '../store'
import {Button, Box, Grid,Typography, CardActionArea, CardActions, CardContent, Card, CardMedia, InputLabel, MenuItem, FormControl, TextField, Select} from '@material-ui/core'
import AddShoppingCart from '@material-ui/icons/AddShoppingCart'
import IconButton from '@material-ui/core/IconButton';
import ProductCard from "./ProductCard";
import CategoriesTest from "./CategoriesTest";

const Products = ({ products, orders, auth, orderItems, createOrder, createOrderItem, editOrderItem}) => {
//TODO: only bring in what we need from the store, like we should only bring in products that are active like in the line below -C
  products = products.filter(product => product.isActive).sort((a, b) => {return a.name < b.name ? -1 : 1});
//TODO: we can change the logic below now that a cart order is created after someone makes a sale
const history = useHistory();

if (products.length === 0) return '...loading'

return (
  <div id="product-gallery" >
  {/* <CategoriesTest /> */}

  <Grid container style={{margin:'3rem'}} spacing={4}  direction='row' alignItems='stretch' >
    {
        products.map(product => {
            return (
                <Grid item component={Card} xs={12} sm={8} md={6} lg={3} xl={2} >
                  <ProductCard product={product} />
                </Grid>
            );
        })
    }
  </Grid>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (user) => {
      dispatch(createOrder(user))
    },
    createOrderItem: (product) => {
      console.log(`product object: ${JSON.stringify(product)}`)
      dispatch(createOrderItem(product))
    },
    editOrderItem: (orderItem) => {
      dispatch(editOrderItem(orderItem))
    }
  }
}

export default connect((state) => state, mapDispatchToProps)(Products);
