import React, {useState} from 'react'
import {connect} from 'react-redux'
import { useHistory } from 'react-router'
import { editOrder, createOrder, editProduct } from '../store'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'


/**
 * COMPONENT
 */
const Success = ({auth, order, editOrder, createOrder, orderItems, editProduct, products}) => {
    const [rating, setRating] = useState(2.5)
    const history = useHistory();
    
    products = products.filter(product => {
        for (let item of orderItems){
            if(item.productId === product.id) return true
        }
    }).sort((a,b) => a.id < b.id);
    
    const newInventory = products.map(product => {
        for (let item of orderItems){
            if(item.productId === product.id) {
                return product.inventory - item.quantity;
            }
        }
    });

    const handleClick = async() => {
      //edit order's date to be when the transaction went through and change isCart status
      //update each product's inventory and if it's zero make it inactive
        await Promise.all([
          editOrder({...order, date: new Date(), isCart: false}),
          createOrder({userId: auth.id, isCart: true}),
          ...products.map((product, idx) => {
            if (newInventory[idx] > 0){
                editProduct({...product, inventory: newInventory[idx]});
            } else {
                editProduct({...product, inventory: newInventory[idx], isActive: false});
            }
        })
        ]);
        history.push('/products');
      }

  
    return (
        <Paper variant="outlined" square >
            <Typography variant='h5'>Success, {auth.username}! 
            <br></br>
              Your order is complete.</Typography>
            <br></br>
            <Button variant='outlined' color='primary' onClick={handleClick}>BACK TO PASTA</Button>
        </Paper>
    )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    auth: state.auth,
    order: state.orders.find(order => order.isCart),
    // orderItems: state.orderItems.filter(item => item.order.isCart),
    orderItems: state.orderItems,
    products: state.products
  }
}
const mapDispatch = dispatch => {
    return {
        editOrder: (order) => dispatch(editOrder(order)),
        createOrder: (order) => dispatch(createOrder(order)),
        editProduct: (product) => dispatch(editProduct(product))
    }
}

export default connect(mapState, mapDispatch)(Success)
