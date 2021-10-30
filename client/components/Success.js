import React, {useState} from 'react'
import {connect} from 'react-redux'
import { useHistory } from 'react-router'
import { editOrder, createOrder, editProduct } from '../store'

import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
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

      console.log(order)
    return (
        <Box 
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                backgroundColor: 'black',
                borderRadius: 10,
                boxShadow: '0 0px 7px 7px #ffffff',
                padding: '1rem',
                margin: '1rem',
            }}
            display='flex'
            flexDirection='column'
            noValidate
            autoComplete="off"
        >
            <Typography 
                style={{alignSelf: 'center'}}
                variant='h5'
            >Success, {auth.username}! 
            <br></br>
              Your order is complete.</Typography>
            <br></br>
            <Button 
                variant='outlined' 
                color='primary' 
                onClick={handleClick}
                style={{
                    borderRadius: 10,
                    background: 'linear-gradient(45deg, #3523d9, #00d3de)',
                    color: 'white',
                    boxShadow: '0 0px 3px 3px #1e23b0',
                    width: '40%',
                    alignSelf: 'center'
                }} 
            >
                BACK TO PASTA
            </Button>
        </Box>
    )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    auth: state.auth,
    order: state.orders.find(order => order.isCart),
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
