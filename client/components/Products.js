import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import {createOrder, createOrderItem, editOrderItem} from '../store'

const Products = ({ products, orders, auth, orderItems, createOrder, createOrderItem, editOrderItem}) => {

  products = products.sort((a, b) => {return a.name < b.name ? -1 : 1});

  return (
    <div id="product-gallery">
      {products.map((product) => {
        return (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
            <h4>{product.name}</h4>
            <img src={product.imageUrl || "https://i.gifer.com/MNu.gif"}></img>
            </Link>
            <div>${product.price}</div>
            <label htmlFor="product-quantity">Quantity:</label>
            <input type="number" id={`${product.id}-quantity`} defaultValue="1" min="1" max="9"/>
            <button type="button" onClick={async (ev) => {
              let cartOrder = orders.find(order => (order.userId === auth.id) && order.isCart)
              
              //If there is an order that is the cart...
              if(cartOrder){
                const orderItem = orderItems.find(orderItem => (orderItem.productId === product.id && orderItem.orderId === cartOrder.id))
                
                //If there is an orderItem in the cart that matches the orderItem we're trying to add...
                if(orderItem){
                  editOrderItem({ id: orderItem.id, quantity: orderItem.quantity + +document.getElementById(`${product.id}-quantity`).value})

                  //If there ISN'T an orderItem in the cart that matches the orderItem we're trying to add...
                } else {
                  createOrderItem({ orderId: cartOrder.id, productId: product.id, quantity: +document.getElementById(`${product.id}-quantity`).value, userId: auth.id})
                }

                //If there ISN'T an order that is the cart...
              } else {
                cartOrder = await createOrder({userId: auth.id})
                console.log(`Cart Order made: ${JSON.stringify(cartOrder)}`)
                createOrderItem({ orderId: cartOrder.id, productId: product.id, quantity: +document.getElementById(`${product.id}-quantity`).value, userId: auth.id})
              } 
              }}>Add to Cart</button>
          </div>
        );
      })}
    </div>
  );
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

export default connect((state) => state, mapDispatchToProps)(Products);
