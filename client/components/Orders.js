import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom"

const Orders = ({ orders }) => {
  return (
    <div id="order-gallery">
      {orders.filter(order => !order.isCart).map((order) => {
        return (
          <div key={order.id}>
            {/* {need to figure out formatting of date} */}
            <Link to={`/orders/${order.id}`}><h4>Order Date: {order.date }</h4></Link>
            <h4>Quantity: {order.orderItems.reduce((accu, cur) => accu + cur.quantity, 0)}</h4>
            <h4>Order Total: ${order.orderItems.reduce((accu, cur) => accu + cur.quantity*cur.product.price, 0)}</h4>
          </div>
        );
      })}
    <Link to={"/home"}><h4>Back</h4></Link>
    </div>
  );
};


export default connect((state) => state)(Orders);
