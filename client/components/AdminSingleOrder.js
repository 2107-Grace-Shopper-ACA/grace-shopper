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
    const tableCols = 6;

    const total = orderItems.reduce((accum, orderItem) => {
        accum += +orderItem.product.price * orderItem.quantity;
        return accum;
    }, 0);
    
        return (
            <div>
                <TableContainer component={Paper} style={{width: '100%', overflowX: 'auto'}}>
                    <Table border={0} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{backgroundColor:'dodgerblue'}}>
                                <TableCell align="center" colSpan={tableCols}>
                                    ORDER DETAILS
                                </TableCell>
                            </TableRow>
                            <TableRow style={{backgroundColor:'cornsilk'}}>
                                <TableCell></TableCell>
                                <TableCell align="left">
                                    Date
                                </TableCell>
                                <TableCell align="left">
                                    Order ID
                                </TableCell>
                                <TableCell align="left">
                                    Purchaser
                                </TableCell>
                                <TableCell align="left">
                                    Order Status
                                </TableCell>
                                <TableCell>
                                    Total
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell align="left">
                                    {order.date}
                                </TableCell>
                                <TableCell align="left">
                                    {order.id}
                                </TableCell>
                                <TableCell align="left">
                                    <Link to={`/admin/orders/users/${order.user.id}`}>
                                        {order.user.username}
                                    </Link>
                                </TableCell>
                                <TableCell align="left">
                                    {order.isCart ? 'Cart' : 'Closed'}
                                </TableCell>
                                <TableCell>
                                    ${total}
                                </TableCell>
                            </TableRow>
                            <TableRow  style={{backgroundColor:'cornsilk'}}>
                            <TableCell></TableCell>
                                <TableCell >Product Name</TableCell>
                                <TableCell >Quantity</TableCell>
                                <TableCell >Price</TableCell>
                                <TableCell >Sub Total</TableCell>
                                <TableCell ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderItems.map((orderItem, idx) => (
                                <TableRow
                                border={1}
                                key={orderItem.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                        <TableCell component="th" scope="row">
                                            {idx + 1}
                                        </TableCell>
                                        <TableCell >
                                            <Link to={`/admin/orders/products/${orderItem.product.id}`}>
                                                {orderItem.product.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell >{orderItem.quantity}</TableCell>
                                        <TableCell >${+orderItem.product.price}</TableCell>
                                        <TableCell >${orderItem.quantity * +orderItem.product.price}</TableCell>
                                        <TableCell >
                                        </TableCell>
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
