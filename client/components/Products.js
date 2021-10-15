import React from "react";
import { connect } from "react-redux";
import {createOrderItem} from '../store/orderItems'

const Products = ({ products, createOrderItem, orders, auth, orderItems }, state) => {
  return (
    <div id="product-gallery">
      {products.map((product) => {
        return (
          <div key={product.id}>
            <h4>{product.name}</h4>
            <img src={product.imageUrl || "https://i.gifer.com/MNu.gif"}></img>
            <label htmlFor="product-quantity">Quantity:</label>
            <input type="number" id={`${product.id}-quantity`} defaultValue="1" min="1" max="9"/>
            {/* Hardcoding one for now to test */}
            <button type="button" onClick={(ev) => {
              console.log(document.getElementById(`${product.id}-quantity`).value)
              const cartOrder = orders.find(order => (order.userId === auth.id) && order.isCart)
              
              if(cartOrder){
                let orderItem = orderItems.find(orderItem => (orderItem.productId === product.id))
                if(orderItem){
                  //PUT thunk editOrderItem
                } else {
                  createOrderItem({ productId: product.id, quantity: document.getElementById(`${product.id}-quantity`).value})
                }
              }
              //console.log(`our productz: ${JSON.stringify(products)}`);
              //console.log(`our state: ${JSON.stringify(state)}`); 
              }}>Add to Cart</button>
          </div>
        );
      })}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrderItem: (product) => {
      console.log(`product object: ${JSON.stringify(product)}`)
      dispatch(createOrderItem(product))
    }
  }
}

export default connect((state) => {console.log(state)
return state}, mapDispatchToProps)(Products);
