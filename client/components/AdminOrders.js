import React, {useState, useEffect} from 'react'
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
import {loadUsers} from '../store';

/**
 * COMPONENT
 */
const AdminOrders = ({orders, orderItems, match, products, history}) => {
    useEffect(() => {
        loadUsers();
    }, []);
    const tableCols = 6;

    let displayOrders, product;
    if (match.path.includes('users')){
        displayOrders = orders.filter(order => order.userId === +match.params.id);
    } else if (match.path.includes('products')){
        const items = orderItems.filter(orderItem => orderItem.productId === match.params.id);
        displayOrders = orders.filter(order => {
            for (const item of items){
                if (item.orderId === order.id) return order;
            }
        });
        product = products.find(product => product.id === match.params.id);       
    } else {
        displayOrders = orders;
    }

    return (
        <div>
            <TableContainer component={Paper} style={{width: '100%', overflowX: 'auto'}}>
                <Table border={0} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow style={{backgroundColor:'dodgerblue'}}>
                    <TableCell align="center" colSpan={tableCols}>
                        {
                            match.path.includes('users') ? `${displayOrders[0].user.username.toUpperCase()}'S ORDERS` : match.path.includes('products') ? `ORDERS WITH ${product.name.toUpperCase()}` : 'ALL ORDERS'
                        }
                    </TableCell>
                    </TableRow>
                    <TableRow style={{backgroundColor:'cornsilk'}}>
                    <TableCell></TableCell>
                        <TableCell>Date Ordered</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Purchaser</TableCell>
                        <TableCell>Order ID</TableCell>
                        <TableCell >Total</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayOrders.map((order, idx) => (
                            <TableRow
                            border={1}
                            key={order.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
                            >
                                    <TableCell component="th" scope="row">
                                        {idx + 1}
                                    </TableCell>
                                    <TableCell >{order.date}</TableCell>
                                    <TableCell >{order.isCart ? 'Cart' : 'Closed'}</TableCell>
                                    <TableCell >
                                        <Link to={`/admin/orders/users/${order.user.id}`}>
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
const mapState = (state, {history, match}) => {
  return {
    orders: state.orders,
    orderItems: state.orderItems,
    history: history,
    match: match,
    products: state.products
  }
}

export default connect(mapState)(AdminOrders)
