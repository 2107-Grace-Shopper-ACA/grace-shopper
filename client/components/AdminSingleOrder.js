import React, { Component } from 'react'
import {connect} from 'react-redux'
import AdminOrderForm from './AdminOrderForm';
/**
 * CLASS COMPONENT
 */


//TODO: handle errors
const AdminSingleOrder = ({order, history}) => {
    const orderItems = order.orderItems;
        return (
            <div>
                <AdminOrderForm history={history} order={order} orderItems={orderItems}/>
            </div>
        )
}

const mapState = (state, {match, history}) => {
    return {
      order: state.adminOrders.find(order => order.id === match.params.id) || {},
    //   orderItems: state.adminOrdersItems.filter(item => item.orderId === match.params.id) || [],
    history: history
    }
}

export default connect(mapState)(AdminSingleOrder)

