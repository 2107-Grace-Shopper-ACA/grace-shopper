import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

import {logout, loadOrders} from '../store'

const Navbar = ({handleClick, isLoggedIn, orderItems, orders, auth, products, update}) => {

  //I moved this from line 33 and changed it so we don't get errors about not finding id
  const cartOrder = orders.find(order => order.isCart);
  const localCart = JSON.parse(localStorage.getItem('localCart')) || [];
  
  const findCartLength = () => {
    if (!cartOrder && !localCart.length) { //if there is no cart order return 0
      return 0;
    } else {
      if (localCart.length){
        return localCart.reduce((accum, item) => {
          accum += item.quantity;
          return accum;
        }, 0)
      } else {
        return !orderItems ? 0 : orderItems.filter(orderItem => orderItem.orderId === cartOrder.id).
          reduce((accum, item) => {
            accum += item.quantity;
            return accum;
          }, 0);
      }
    }
  }

  const totalInventory = products.reduce((accum, product) => {
    accum += product.inventory;
    return accum;
  }, 0);
//TODO: Why doesn't this update when the pathname changes? it only updates once I add to cart  
//TODO: why does it only work when i use totalInventory?
useEffect(() => {
  findCartLength()
}, [window.location.pathname, totalInventory])
  
//TODO: Doesn't update when admin changes quantity of cart order item
  // useEffect(() => {
  //   loadOrderItems()
  // }, [...itemsMap])

return (
  <div>
    <h1>Pasta Peddler</h1>
      {
      window.location.pathname.includes('success') ? '' :
      isLoggedIn  ? (
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                {/* <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton> */}
                
                <Link to="/products">Products</Link>
                
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
          </Box>
        </div>
      ) : (
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                {/* <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton> */}
                
                <Link to="/products">Products</Link>
                
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
          </Box>
        </div>
      )}
    <hr />
  </div>
)}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    orderItems: state.orderItems,
    orders: state.orders,
    auth: state.auth, 
    products: state.products,
    update: state.update
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    loadOrders() {
      dispatch(loadOrders())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
