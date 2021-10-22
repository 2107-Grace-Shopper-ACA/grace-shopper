import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, loadOrders} from '../store'

const Navbar = ({handleClick, isLoggedIn, orderItems, orders, auth}) => {

  //I moved this from line 33 and changed it so we don't get errors about not finding id
  const cartOrder = orders.find(order => order.isCart);
  const findCartLength = () => {
    if (!cartOrder) { //if there is no cart order return 0
      return 0;
    } else {
      return !orderItems ? 0 : orderItems.filter(orderItem => orderItem.orderId === cartOrder.id).
        reduce((accum, item) => {
          accum += item.quantity;
          return accum;
        }, 0);
    }
  }


return (
  <div>
    <h1>Pasta Peddler</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/products">Products</Link>
          <Link to="/home">Home</Link>
          <a href="#" onClick={()=>{
            handleClick()
            loadOrders()
          }}>
            Logout
          </a>
          {/* <Link to ="/cart">Cart({orderItems.filter(orderItem => orderItem.orderId === (orders.find(order => order.isCart)).id).reduce((accu, cur) => {return accu + cur.quantity}, 0)})</Link> */}
  {/* //don't know why this doesn't work */}
          {/* {
            !window.location.pathname.includes('success') ? <Link to ="/cart">Cart({findCartLength()})</Link> : ''
          } */}
          <Link to ="/cart">Cart({findCartLength()})</Link>
          
          {
            !!auth.isAdmin && <Link to="/admin">Admin</Link>
          }
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/products">Products</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to ="/cart">Cart({findCartLength()})</Link>
          {/* <Link to ="/cart">Cart({orderItems.filter(orderItem => orderItem.orderId === (orders.find(order => order.isCart)).id).reduce((accu, cur) => {return accu + cur.quantity}, 0)})</Link> */}
        </div>
      )}
    </nav>
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
    auth: state.auth
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
