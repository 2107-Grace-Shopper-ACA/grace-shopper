import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {loadAdminOrders, loadAdminOrderItems} from '../store';

//TODO  will have to component did update in main app to account for admin store stuff

/**
 * COMPONENT
 */
const AdminOrders = ({orders, orderItems, match, products, loadAdminOrderItems, loadAdminOrders}) => {
    
//TODO not sure if i need this
    useEffect(() => {
        loadAdminOrderItems();
        loadAdminOrders();
    }, []);
    
    const tableCols = 7;

    let displayOrders, product;

    if (match.path.includes('users')){
        displayOrders = orders.filter(order => order.userId === match.params.id);
    } else if (match.path.includes('products')){
        const items = orderItems.filter(orderItem => orderItem.productId === match.params.id);
        displayOrders = orders.filter(order => {
            for (const item of items){
                if (item.orderId === order.id) return order;
            }
        });
        product = products.find(product => product.id === match.params.id);       
    } else if (match.path.includes('open')){
        displayOrders = orders.filter(order => order.isCart);
    } else if (match.path.includes('closed')){
        displayOrders = orders.filter(order => !order.isCart);
    } else {
        displayOrders = orders;
    }
    
    displayOrders = displayOrders.map(order => {
        const totalQuantity = order.orderItems.reduce((accum, item) => {
            accum += item.quantity;
            return accum;
        }, 0);
        return (
            {
                ...order,
                totalQuantity
            }
        )
    })

    if (!displayOrders.length || (match.path.includes('products') && !product)) {
        return '...loading';
    }   

//styling    
    const header = {fontWeight: 'bold'};
    const link = {color: 'darkblue', textDecoration: 'none'}
//
    return (
        <div>
            <TableContainer component={Paper} style={{width: '100%', overflowX: 'auto'}}>
                <Table border={3} sx={{ minWidth: 650 }} size="small">
                    <TableHead>
                    <TableRow style={{backgroundColor:'dodgerblue'}}>
                    <TableCell align="center" colSpan={tableCols} style={header}>
                        {
                            match.path.includes('users') ? 
                                `${displayOrders[0].user.username.toUpperCase()}'S ORDERS` 
                            : match.path.includes('products') ? 
                                `ORDERS WITH ${product.name.toUpperCase()}` 
                            : match.path.includes('open') ?
                                'OPEN ORDERS'
                            : match.path.includes('closed') ?
                                'CLOSED ORDERS'
                            : 'ALL ORDERS'
                        }
                    </TableCell>
                    </TableRow>
                    <TableRow style={{backgroundColor:'cornsilk'}}>
                    <TableCell></TableCell>
                        <TableCell style={header}>
                            Date Ordered
                        </TableCell>
                        <TableCell style={header}>
                            Order ID
                        </TableCell>
                        <TableCell style={header}>
                            Status
                        </TableCell>
                        <TableCell style={header}>
                            Purchaser
                        </TableCell>
                        <TableCell style={header}>
                            Total Items
                        </TableCell>
                        <TableCell style={header} >
                            Total
                        </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayOrders.map((order, idx) => (
                            <TableRow
                            border={1}
                            key={order.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
                            >
                                    <TableCell component="th" scope="row" style={header}>
                                        {idx + 1}
                                    </TableCell>
                                    <TableCell >
                                        {order.date}
                                    </TableCell>
                                    <TableCell >
                                        <Link style={link} to={`/admin/orders/${order.id}`}>
                                        {order.id}
                                        </Link>
                                    </TableCell>
                                    <TableCell >
                                        {
                                            order.isCart ? 
                                                <Link style={link} to={`/admin/orders/open`}>
                                                    Open
                                                </Link>
                                            :   <Link style={link} to={`/admin/orders/closed`}>
                                                    Closed
                                                </Link>
                                        }
                                    </TableCell>
                                    <TableCell >
                                        <Link style={link} to={`/admin/orders/users/${order.user.id}`}>
                                            {order.user.username}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {order.totalQuantity}
                                    </TableCell>
                                    <TableCell >
                                        ${orderItems.filter(orderItem => orderItem.orderId === order.id).reduce((accum, orderItem) => 
                                            {accum += +orderItem.product.price * orderItem.quantity; return accum;}, 0)
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
    orders: state.adminOrders,
    orderItems: state.adminOrderItems,
    history: history,
    match: match,
    products: state.products
  }
}
const mapDispatch = dispatch => {
    return {
        loadAdminOrderItems: () => dispatch(loadAdminOrderItems()),
        loadAdminOrders: () => dispatch(loadAdminOrders())
    }
}

export default connect(mapState, mapDispatch)(AdminOrders)
