import React, {useState, Component, useEffect} from 'react'
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
import axios from 'axios';
import { loadAdminOrders } from '../store';
/**
 * COMPONENT
 */
const AdminSingleOrder = ({order, orderItems }) => {
    // useEffect(()=> {
    //     loadAdminOrders();
    // }, []);
    
    const total = orderItems.reduce((accum, orderItem) => {
        accum += +orderItem.product.price * orderItem.quantity;
        return accum;
    }, 0);
    console.log(order)


    
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
                            <TableCell >Product Name</TableCell>
                            <TableCell >Quantity</TableCell>
                            <TableCell >Price</TableCell>
                            <TableCell >Total</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderItems.map((orderItem, idx) => (
                                <TableRow
                                border={3}
                                key={orderItem.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
                                >
                                        <TableCell component="th" scope="row">
                                            {idx + 1}
                                        </TableCell>
                                        <TableCell >{order.date}</TableCell>
                                        <TableCell >{order.isCart ? 'Cart' : 'Closed'}</TableCell>
                                        <TableCell >
                                            {order.user.username}
                                        </TableCell>
                                        <TableCell >
                                            {order.id}
                                        </TableCell>
                                        <TableCell >{orderItem.product.name}</TableCell>
                                        <TableCell >{orderItem.quantity}</TableCell>
                                        <TableCell >{+orderItem.product.price}</TableCell>
                                        <TableCell >{orderItem.quantity * +orderItem.product.price}</TableCell>
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
const mapState = (state, {match, history}) => {
  return {
    match: match,
    order: state.orders.find(order => order.id === match.params.id),
    orderItems: state.orderItems.filter(orderItem => orderItem.orderId === match.params.id),
    // products: state.products,
    // users: state.users
  }
}
const mapDispatch = (dispatch) => {
    return {
        loadAdminOrders: () => dispatch(loadAdminOrders()),
    }
}
export default connect(mapState)(AdminSingleOrder)
