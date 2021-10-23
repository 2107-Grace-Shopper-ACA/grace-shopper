import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import {createOrder, createOrderItem, editOrderItem} from '../store'

const Products = ({ products, orders, auth, orderItems, createOrder, createOrderItem, editOrderItem}) => {
//TODO: only bring in what we need from the store, like we should only bring in products that are active like in the line below -C
  products = products.filter(product => product.isActive).sort((a, b) => {return a.name < b.name ? -1 : 1});
//TODO: we can change the logic below now that a cart order is created after someone makes a sale

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
            {
              product.inventory < 11 ? <h6>Only {product.inventory} left in stock!</h6> : ''
            }
            <input type="number" id={`${product.id}-quantity`} defaultValue="1" min="1" max={product.inventory < 9 ? product.inventory : 9}/>
            <button type="button" onClick={async (ev) => {
              let cartOrder = orders.find(order => (order.userId === auth.id) && order.isCart)
  
    //adding this for ease in testing the stuff i am adding but didn't make the change to other people's code - C                
              const quantity = +document.getElementById(`${product.id}-quantity`).value;
              
              //If there is an order that is the cart...
              if(cartOrder){
                const orderItem = orderItems.find(orderItem => (orderItem.productId === product.id && orderItem.orderId === cartOrder.id))
                
                //If there is an orderItem in the cart that matches the orderItem we're trying to add...
                if(orderItem){
  //check to see if inventory will allow
                  if  ((quantity + orderItem.quantity) > product.inventory){
  //TODO: change alert
                        alert(`Your ${product.name} order quantity exceeds our inventory. YOU WILL GET ${product.inventory} ${product.name} AND YOU'LL LOVE IT!!!!`)
                        editOrderItem({...orderItem, quantity: product.inventory});
                      } else {
                        editOrderItem({ id: orderItem.id, quantity: orderItem.quantity + +document.getElementById(`${product.id}-quantity`).value})
                      }
                  //If there ISN'T an orderItem in the cart that matches the orderItem we're trying to add...
                } else {
                  if  (quantity > product.inventory){
  //TODO: change alert
                    alert(`Your ${product.name} order quantity exceeds our inventory. YOU WILL GET ${product.inventory} ${product.name} AND YOU'LL LOVE IT!!!!`)
                    createOrderItem({orderId: cartOrder.id, productId: product.id, quantity: product.inventory, userId: auth.id});
                  } else {
                    createOrderItem({ orderId: cartOrder.id, productId: product.id, quantity: +document.getElementById(`${product.id}-quantity`).value, userId: auth.id})
                  }
                }

                //If there ISN'T an order that is the cart...
              } else {
                cartOrder = await createOrder({userId: auth.id})
                console.log(`Cart Order made: ${JSON.stringify(cartOrder)}`)
                if  (quantity > product.inventory){
//TODO: change alert
                  alert(`Your ${product.name} order quantity exceeds our inventory. YOU WILL GET ${product.inventory} ${product.name} AND YOU'LL LOVE IT!!!!`)
                  createOrderItem({orderId: cartOrder.id, productId: product.id, quantity: product.inventory, userId: auth.id});
                } else {
                  createOrderItem({ orderId: cartOrder.id, productId: product.id, quantity: +document.getElementById(`${product.id}-quantity`).value, userId: auth.id})
                }
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
