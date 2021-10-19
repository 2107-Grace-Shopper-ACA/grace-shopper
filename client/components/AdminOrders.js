import React, {useState} from 'react'
import {connect} from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import AdminProductForm from './AdminProductForm';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import orderItems from '../store/orderItems';

/**
 * COMPONENT
 */
const AdminOrders = ({orders, orderItems, history}) => {

    return (
        <div>
            <TableContainer component={Paper} style={{width: '100%', overflowX: 'auto'}}>
                <Table border={2} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow  style={{backgroundColor:'cornsilk'}}>
                    <TableCell></TableCell>
                        <TableCell>Date Ordered</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Purchaser</TableCell>
                        <TableCell>Order ID</TableCell>
                        <TableCell >Total</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order, idx) => (
                            <TableRow
                            border={3}
                            key={order.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
                            >
                                    <TableCell component="th" scope="row">
                                        {idx + 1}
                                    </TableCell>
                                    <TableCell >{order.date}</TableCell>
                                    <TableCell >{order.isCart ? 'Cart' : 'Closed'}</TableCell>
                                    <TableCell >
        //TODO path to admin/orders/users/userId
                                        <Link to={`/admin/orders/${order.id}`}>
                                        {order.user.username}
                                        </Link>
                                    </TableCell>
                                    <TableCell >
                                        <Link to={`/admin/orders/${order.id}`}>
                                        {order.id}
                                        </Link>
                                    </TableCell>
                                    <TableCell >${orderItems.filter(orderItem => 
                                    orderItem.orderId === order.id)
                                    .reduce((accum, orderItem) => {
                                        accum += +orderItem.product.price * orderItem.quantity; return accum;}, 0)
                                    }</TableCell>
                            </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

/**
 * CONTAINER
 */
const mapState = (state, {history}) => {
  return {
    orders: state.orders,
    orderItems: state.orderItems,
    history: history,
  }
}

export default connect(mapState)(AdminOrders)
