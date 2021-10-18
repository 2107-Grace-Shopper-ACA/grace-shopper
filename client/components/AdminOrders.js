import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

/**
 * CLASS COMPONENT
 */
const AdminOrders = ({orders}) => {
    return (
        <div >
            {orders.map((order) => {
                return (
                <div key={order.id}>
                    <Link to={`/admin/orders/${order.id}`}>
                        TODO: ADD ORDERS
                    </Link>
                </div>
                );
            })}
        </div>    
    )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    orders: state.orders
  }
}

export default connect(mapState)(AdminOrders)
