import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {editOrderItem, createOrderItem } from '../store'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username, orders, orderItems, auth, editOrderItem, createOrderItem} = props
  
  if (orders.length === 0) return '...loading'
  
  let cartOrder = orders.find(order => order.isCart);
  if (!cartOrder) console.log('nocartorder')
  let cartItems = orderItems.filter(orderItem => orderItem.orderId === cartOrder.id);
  let localCart = JSON.parse(localStorage.getItem('localCart')) || [];
  //IF GUEST STILL ADD TO CART
  if (!auth.id){
    cartItems = localCart || [];
//USER LOGGED IN  
  } else {
    if (localCart.length) {
//see if there's items in user cart and if so, compare each item in localcart before adding to user cart
      if (cartItems.length) {
        localCart.forEach(async(localItem) => {
            for (let item of cartItems) {
              if (item.productId === localItem.id) {
                await editOrderItem({...item, quantity: item.quantity + localItem.quantity});
              } else {
                await createOrderItem({productId: localItem.id, quantity: localItem.quantity, orderId: cartOrder.id, userId: auth.id});
              }
            }
        })
      } else {
        localCart.forEach(async(localItem) => {
          await createOrderItem({productId: localItem.id, quantity: localItem.quantity, orderId: cartOrder.id, userId: auth.id});
        });
      }
    }
    localStorage.removeItem('localCart');
  }
  
  return (
    <div>
      <h3>Welcome, {username}</h3>
      <Link to="/orders"><h4>Your Orders</h4></Link>
      <Link to="/updatePersonalInfo"><h4>Update Personal Info</h4></Link>
    </div>

  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
    orders: state.orders,
    orderItems: state.orderItems,
    auth: state.auth,
    update: state.update
  }
}
const mapDispatch = dispatch => {
  return {
    createOrderItem: (item) => dispatch(createOrderItem(item)),
    editOrderItem: (item) => dispatch(editOrderItem(item)),
  }
}
export default connect(mapState, mapDispatch)(Home)
