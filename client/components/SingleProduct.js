import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import {createOrder, createOrderItem, editOrderItem} from '../store'

const SingleProduct = ({products, match, orders, auth, orderItems, createOrder, createOrderItem, editOrderItem}) => {
    const product = products.find(product => product.id === match.params.productId)
    const { name, description, imageUrl, price } = product
    return(
        <div id="single-product-gallery">
            <h4>{name}</h4> <Link to={'/products'}><h5>Return to Products</h5></Link>
            <img src={imageUrl || "https://i.gifer.com/MNu.gif"}></img>
            <div>{description}</div>
            <div>${price}</div>
            <label htmlFor="product-quantity">Quantity:</label>
            <input type="number" id={`${product.id}-quantity`} defaultValue="1" min="1" max="9"/>
            <button type="button" onClick={(ev) => {
              console.log(document.getElementById(`${product.id}-quantity`).value)
              let cartOrder = orders.find(order => (order.userId === auth.id) && order.isCart)
              
              //If there is an order that is the cart...
              if(cartOrder){
                const orderItem = orderItems.find(orderItem => (orderItem.productId === product.id && orderItem.orderId === cartOrder.id))
                
                //If there is an orderItem in the cart that matches the orderItem we're trying to add...
                if(orderItem){
                  editOrderItem({ id: orderItem.id, quantity: orderItem.quantity + +document.getElementById(`${product.id}-quantity`).value})

                  //If there ISN'T an orderItem in the cart that matches the orderItem we're trying to add...
                } else {
                  createOrderItem({ orderId: cartOrder.id, productId: product.id, quantity: +document.getElementById(`${product.id}-quantity`).value})
                }

                //If there ISN'T an order that is the cart...
              } else {
                cartOrder = createOrder({userId: auth.id})
                createOrderItem({ orderId: cartOrder.id, productId: product.id, quantity: +document.getElementById(`${product.id}-quantity`).value})
              } 
              }}>Add to Cart</button>
        </div>        
    )
};

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
      }
    }
  }

export default connect((state) => state, mapDispatchToProps)(SingleProduct);