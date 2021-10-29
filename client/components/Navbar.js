import React, {useEffect} from 'react'
import { useHistory } from 'react-router'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import HomeIcon from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import {logout, loadOrders} from '../store'
import { Button } from '@material-ui/core'

const Navbar = ({handleClick, isLoggedIn, orderItems, orders, auth, products, update}) => {
  const history = useHistory();
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
  

return (
  <div>
    <nav>
      {
      window.location.pathname.includes('success') ? '' :
      isLoggedIn  ? (
        <>
          {/* The navbar will show these links after you log in */}
          <AppBar position='sticky'>
            <Toolbar>
              <Button
                color='secondary'
                onClick={() => history.push('/home')}
                startIcon={<HomeIcon />}
              >
                Pasta Peddler
              </Button>
              <Button>
                <Link to="/products">Products</Link>
              </Button>
              <Button color='secondary' startIcon={<ShoppingCartIcon />} onClick={() => history.push('/cart')}>
                  ({findCartLength()})
              </Button> 
              <Button sx={{flexGrow: '3'}}>
                <Link to="#" onClick={()=>{
                  handleClick()
                  loadOrders()
                }}>
                  Logout {auth.username}
                </Link>
              </Button>
              {
                !!auth.isAdmin && 
                <Button>
                  <Link to="/admin">Admin</Link>
                </Button>
              }
            </Toolbar>
          </AppBar>  
        </>
      ) : (
        <>
          {/* The navbar will show these links before you log in */}
          <AppBar position='sticky'>
            <Toolbar>
              <Button>
                <Link to="/home">Pasta Peddler</Link>
              </Button>
              <Button>
                <Link to="/products">Products</Link>
              </Button>
              <Button color='secondary' startIcon={<ShoppingCartIcon />} onClick={() => history.push('/cart')}>
                  ({findCartLength()})
              </Button>
                <Button>
                  <Link to="/login" style={{alignSelf: 'flex-end'}} onClick={()=>{
                    handleClick()
                    loadOrders()
                  }}>
                    Login
                  </Link>
                </Button>
                <Button>
                  <Link to="/signup">
                    Sign Up
                  </Link>
                </Button>
            </Toolbar>
          </AppBar>
        </>
      )}
    </nav>
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
