import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"

const SingleOrder = ({orders, match}) => {
    const order = orders.find(order => order.id === match.params.orderId)
    const { orderItems } = order
    return(
        <div id="single-order-gallery">
            {orderItems.map((orderItem) => {
        return (
          <div key={orderItem.id}>
              {console.log(orderItem)}
            <h4>{orderItem.product.name}</h4>
            <h4>Quantity: {orderItem.quantity}</h4>
            <h4>Price: ${orderItem.product.price}</h4>
            {/* {why is this getting NaN?} */}
            <h4>Subtotal: ${orderItem.quanitity*(orderItem.product.price*1)}</h4>
          </div>
        );
      })}
        <Link to={"/orders"}><h4>Back</h4></Link>
        </div>        
    )
};

export default connect((state) => state)(SingleOrder);