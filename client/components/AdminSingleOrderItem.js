import React, { Component } from 'react'
import {connect} from 'react-redux'
import AdminOrderItemForm from './AdminOrderItemForm';
/**
 * CLASS COMPONENT
 */


//TODO: handle errors
const AdminSingleOrderItem = ({history, orderItem}) => {
        return (
            <div>
                <AdminOrderItemForm history={history} orderItem={orderItem}/>
            </div>
        )
}

const mapState = (state, {match, history}) => {
    return {
      orderItem: state.adminOrderItems.find(item => item.id === match.params.id) || {},
      history: history
    }
}

export default connect(mapState)(AdminSingleOrderItem)

