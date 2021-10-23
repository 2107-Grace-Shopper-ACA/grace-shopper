import React, {useState} from 'react'
import { useEffect } from 'react';
import { connect } from 'react-redux'
import { deleteOrderItem, editOrderItem,loadOrderItems } from '../store';

const Cart = ({ orders, orderItems, editOrderItem, deleteOrderItem, loadOrderItems }) => {
  let cartOrder = orders.find(order => order.isCart);
  let cartItems = orderItems.filter(orderItem => orderItem.orderId === cartOrder.id);
  
  if(orders.length === 0 || !cartOrder || cartItems.length === 0) return 'Your cart is empty!'
  
//Prepping items for Stripe PUT request  
  const stripeCartItems = cartItems.map(item => {
    return (
//TODO: need to only send id and quantity for security
      {
        quantity: item.quantity,
        price: +item.product.price * 100,
        name: item.product.name,
        orderItemId: item.id
      }
    )
  });
//
  const handleClick = async() => {
    fetch("/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Send along all the information about the items
        body: JSON.stringify({
          items: stripeCartItems,
          orderId: cartOrder.id
        }),
      })
        .then(res => {
          if (res.ok) return res.json()
          return res.json().then(e => Promise.reject(e))
        })
        .then(({ url }) => {
          // On success redirect the customer to the returned URL
          window.location = url
        })
        .catch(e => {
          console.error(e.error)
        })
}

//trying to update cart if admin edits something

// useEffect(() => {
//   loadOrderItems()
// }, [cartItems.length])

//Prevents a crash on a hard reload

//combined this stuff and moved to top
// if(orders.length === 0) return 'Your cart is empty!'

// const cartOrder = orders.find((order) => order.isCart)
//i think we only need to check if there's a cart order bc there can't be orderitems in the cart if there's no cart order until we do the guest stuff //commenting this out for now for debugging
// if(!cartOrder) return 'Your cart is empty!'

//something really weird is happening where it doesn't change when you add an item to an empty cart
  // if(!cartOrder || cartOrder.orderItems.length === 0) return 'Your cart is empty!'
  // if(!cartOrder || !cartItems.length) return 'Your cart is empty!'

  return (
    <div>
      <button onClick={handleClick} >
        Checkout
      </button>
    
      
      {`Order ID: ${cartOrder.id}`}
      <div>
        {cartItems.map(orderItem => {
          
          let quantity;
          
          return (
            <div key={orderItem.id}>
              <h4>{orderItem.product.name}</h4>
              <img
                id='orderImg'
                src={
                  orderItem.product.imageUrl || 'https://i.gifer.com/MNu.gif'
                }
              ></img>
              <ul>
                {/*For debugging*/}
                <li>
                  Quantity:
            <input type="number" id={`${orderItem.product.id}-quantity`} defaultValue={orderItem.quantity} min="0" max="9"/>
            <button type="button" onClick={async (ev) => {
                if( +document.getElementById(`${orderItem.product.id}-quantity`).value !== 0){
                  editOrderItem({ id: orderItem.id, quantity: +document.getElementById(`${orderItem.product.id}-quantity`).value})
                } else {
                  deleteOrderItem(orderItem.id)
                }
              }} 
              >Change</button>
                </li>
                <li>Price: {orderItem.product.price}</li>
                <li>UserId: {orderItem.userId}</li>
                <li>Order: {orderItem.orderId}</li>
              </ul>
            </div>
          )
        })}
        {`Subtotal: $${cartItems.reduce((accu, cur) => {return accu + cur.quantity*cur.product.price}, 0)}`}
      </div>
      {/* 
      Even having this live on this page prevents the working div from updating!!!
      <div>
        {cartOrder.orderItems.map((orderItem) => {
          return (
            <div key={orderItem.id}>
              <h4>{orderItem.product.name}</h4>
              <img
                id='orderImg'
                src={
                  orderItem.product.imageUrl || 'https://i.gifer.com/MNu.gif'
                }
              ></img>
              <ul>
                <li>Quantity: {orderItem.quantity}</li>
                <li>UserId: {orderItem.userId}</li>
                <li>Order: {orderItem.orderId}</li>
              </ul>
            </div>
          )
        })}
      </div> */}
    </div>
  )
}
const mapDispatch = (dispatch, {history}) => {
  return (
    {
      editOrderItem: (order) => dispatch(editOrderItem(order)),
      deleteOrderItem: (id) => dispatch(deleteOrderItem(id)),
      loadOrderItems: () => dispatch(loadOrderItems())
    }
  )
}
export default connect((state) => state, mapDispatch)(Cart)
