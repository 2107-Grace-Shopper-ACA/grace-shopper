import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import UpdatePersonalInfo from './UpdatePersonalInfo'
import {editOrderItem, createOrderItem, loadOrderItems } from '../store'

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
console.log('HOMEEE')
  //IF GUEST STILL ADD TO CART
  if (!auth.id){
    cartItems = localCart || [];
    // console.log('cartitems', cartItems)
//USER LOGGED IN  
  } else {
    console.log('local cart', localCart)
    console.log("SDFDSF")
    if (localCart.length) {
      console.log('haslength')
//see if there's items in user cart and if so, compare each item in localcart before adding to user cart
      // const userCartItems = orderItems.filter(orderItem => orderItem.orderId === cartOrder.id);
      if (cartItems.length) {
        console.log('cartOrder', cartOrder)
        console.log('cartitems length', cartItems.length)
        localCart.forEach(async(localItem) => {
          // let added = false;
          // while (!added){
            for (let item of cartItems) {
              console.log(localItem, item)
              if (item.productId === localItem.id) {
                console.log('editorderitem')
                await editOrderItem({...item, quantity: item.quantity + localItem.quantity});
                // added = true;
              } else {
                console.log('createorderitem')
                await createOrderItem({productId: localItem.id, quantity: localItem.quantity, orderId: cartOrder.id, userId: auth.id});
              }
            }
            // added = true;
          // }
        })
        // localStorage.removeItem('localCart');
      } else {
        localCart.forEach(async(localItem) => {
          await createOrderItem({productId: localItem.id, quantity: localItem.quantity, orderId: cartOrder.id, userId: auth.id});
        });
      }
    }
    // loadOrderItems()
    localStorage.removeItem('localCart');
    console.log('removelocal')
    localCart = [];
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
    auth: state.auth
  }
}
const mapDispatch = dispatch => {
  return {
    createOrderItem: (item) => dispatch(createOrderItem(item)),
    editOrderItem: (item) => dispatch(editOrderItem(item)),
    
  }
}
export default connect(mapState, mapDispatch)(Home)
