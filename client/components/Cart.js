import React from 'react'
import { connect } from 'react-redux'

const Cart = ({ orders, orderItems }) => {

  //Prevents a crash on a hard reload
  if(orders.length === 0) return 'Your cart is empty!'

  const cartOrder = orders.find((order) => order.isCart)

  if(cartOrder.orderItems.length === 0) return 'Your cart is empty!'

  return (
    <div>
      {`Order ID: ${cartOrder.id}`}
      <div>
        {orderItems.filter(orderItem => orderItem.orderId === cartOrder.id).map(orderItem => {
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
                <li>Quantity: {orderItem.quantity}</li>
                <li>UserId: {orderItem.userId}</li>
                <li>Order: {orderItem.orderId}</li>
              </ul>
            </div>
          )
        })}
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

export default connect((state) => state)(Cart)
