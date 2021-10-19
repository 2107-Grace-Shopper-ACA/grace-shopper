import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
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
    const tableCols = 7;

    const total = orderItems.reduce((accum, orderItem) => {
        accum += +orderItem.product.price * orderItem.quantity;
        return accum;
    }, 0);

    const totalItems = orderItems.reduce((accum, orderItem) => {
        accum += orderItem.quantity;
        return accum;
    }, 0);
    
    orderItems = orderItems.sort((a, b) => {return a.product.name < b.product.name ? -1 : 1});

    if (!order) return '...loading'

//styling    
    const header = {fontWeight: 'bold'}
//

        return (
            <div>
                <TableContainer component={Paper} style={{width: '100%', overflowX: 'auto'}}>
                    <Table border={0} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow style={{backgroundColor:'dodgerblue'}}>
                                <TableCell align="center" colSpan={tableCols} style={header}>
                                    ORDER DETAILS
                                </TableCell>
                            </TableRow>
                            <TableRow style={{backgroundColor:'cornsilk'}}>
                                <TableCell></TableCell>
                                <TableCell style={header}>
                                    Date
                                </TableCell>
                                <TableCell style={header}>
                                    Order ID
                                </TableCell>
                                <TableCell style={header}>
                                    Purchaser
                                </TableCell>
                                <TableCell style={header}>
                                    Order Status
                                </TableCell>
                                <TableCell style={header}>
                                    Items 
                                </TableCell>
                                <TableCell style={header}>
                                    Total
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell >
                                    {order.date}
                                </TableCell>
                                <TableCell >
                                    {order.id}
                                </TableCell>
                                <TableCell >
                                    <Link to={`/admin/orders/users/${order.user.id}`}>
                                        {order.user.username}
                                    </Link>
                                </TableCell>
                                <TableCell >
                                {
                                    order.isCart ? 
                                        <Link to={`/admin/orders/open`}>
                                            Cart
                                        </Link>
                                    :   <Link to={`/admin/orders/closed`}>
                                            Closed
                                        </Link>
                                }
                                </TableCell>
                                <TableCell>
                                    {totalItems}
                                </TableCell>
                                <TableCell>
                                    ${total}
                                </TableCell>
                            </TableRow>
                            <TableRow  style={{backgroundColor:'cornsilk'}}>
                            <TableCell></TableCell>
                                <TableCell style={header}>
                                    Product Name
                                </TableCell>
                                <TableCell style={header}>
                                    Quantity
                                </TableCell>
                                <TableCell style={header}>
                                    Price
                                </TableCell>
                                <TableCell style={header}>
                                    Sub Total
                                </TableCell>
                                <TableCell ></TableCell>
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
                                        <TableCell component="th" scope="row" style={header}>
                                            {idx + 1}
                                        </TableCell>
                                        <TableCell >
                                            <Link to={`/admin/orders/products/${orderItem.product.id}`}>
                                                {orderItem.product.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell >
                                            {orderItem.quantity}
                                        </TableCell>
                                        <TableCell >
                                            ${+orderItem.product.price}
                                        </TableCell>
                                        <TableCell >
                                            ${orderItem.quantity * +orderItem.product.price}
                                        </TableCell>
                                        <TableCell ></TableCell>
                                        <TableCell ></TableCell>
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
