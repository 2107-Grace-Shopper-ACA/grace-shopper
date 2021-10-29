import React, { useState, useEffect, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { createOrder, createOrderItem, editOrderItem } from '../store'
import {
  Button,
  Box,
  Grid,
  Typography,
  CardActionArea,
  CardActions,
  CardContent,
  Card,
  CardMedia,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
  Select,
} from '@material-ui/core'
import AddShoppingCart from '@material-ui/icons/AddShoppingCart'
import IconButton from '@material-ui/core/IconButton'
import ProductCard from './ProductCard'
import CategoriesTest from './CategoriesTest'
import Filter from './Filter'

// { products, orders, auth, orderItems, createOrder, createOrderItem, editOrderItem}

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: this.props.products,
      category: '',
      sort: '',
    }
    this.filterProducts = this.filterProducts.bind(this)
    this.sortProducts = this.sortProducts.bind(this)
  }

  filterProducts(event) {
    console.log(event.target.value)
    if (event.target.value === '') {
      this.setState({
        ...this.state,
        category: event.target.value,
        products: this.props.products,
      })
    } else {
      this.setState({
        ...this.state,
        category: event.target.value,
        products: this.props.products.filter(
          (product) => product.category.name === event.target.value
        ),
      })
    }
  }

  sortProducts(event) {
    const sort = event.target.value
    console.log(event.target.value)
    this.setState({
      ...this.state,
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === 'lowest'
            ? a.price * 1 > b.price * 1
              ? 1
              : -1
            : sort === 'highest'
            ? a.price * 1 < b.price * 1
              ? 1
              : -1
            : a.name > b.name
            ? 1
            : -1
        ),
    })
  }

  render() {
    const {
      products,
      orders,
      auth,
      orderItems,
      createOrder,
      createOrderItem,
      editOrderItem,
    } = this.state
    //TODO: only bring in what we need from the store, like we should only bring in products that are active like in the line below -C
    // products = products.filter(product => product.isActive)
    //.sort((a, b) => {return a.name < b.name ? -1 : 1});
    //TODO: we can change the logic below now that a cart order is created after someone makes a sale
    //if (products.length === 0) return '...loading'
    // const history = useHistory();
    return (
      <div id="product-gallery">
        {/* <CategoriesTest /> */}
        <Filter
          count={products.length}
          category={this.state.category}
          sort={this.state.sort}
          filterProducts={this.filterProducts}
          sortProducts={this.sortProducts}
        />
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ margin: '3rem' }}
          spacing={4}
          direction="row"
          alignItems="stretch"
        >
          {products
            .filter((product) => product.isActive)
            .map((product) => {
              return (
                <Grid
                  key={product.id}
                  item
                  component={Card}
                  xs={12}
                  sm={8}
                  md={6}
                  lg={3}
                  xl={2}
                  style={{ margin: '1rem' }}
                >
                  <ProductCard product={product} />
                </Grid>
              )
            })}
        </Grid>
      </div>
    )
  }
}

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
    },
  }
}

export default connect((state) => state, mapDispatchToProps)(Products)
