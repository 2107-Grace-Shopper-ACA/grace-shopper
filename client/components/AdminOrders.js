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

/**
 * COMPONENT
 */
const AdminOrders = ({orders, history}) => {

//dialog box
    const [open, setOpen] = useState(false);
    const handleOpen = (ev) => {
        ev.persist()
        setOpen(true);
    }
    const handleClose = (ev) => {
        ev.preventDefault();
        setOpen(false);
    }
//

    return (
        <div>
            <Dialog onClose={handleClose} open={open}>
                <AdminProductForm handleClose={handleClose} history={history}/>
            </Dialog>
            <TableContainer component={Paper} style={{width: '100%', overflowX: 'auto'}}>
                <Table border={2} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow  style={{backgroundColor:'cornsilk'}}>
                        <TableCell width='5%'><Button onClick={handleOpen} size='small' color='primary' variant='contained'>Add Product</Button></TableCell>
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
                        {orders.map((order, idx) => (
                            <TableRow
                            border={3}
                            key={order.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
                            >
                                    <TableCell component="th" scope="row">
                                        {idx + 1}
                                    </TableCell>
                                    <TableCell >TO DO</TableCell>
                                    <TableCell >{order.isCart}</TableCell>
                                    <TableCell >
        //TODO path to admin/orders/users/userId
                                        <Link to={`/admin/orders/${order.id}`}>
                                        PURCHASER
                                        </Link>
                                    </TableCell>
                                    <TableCell >
                                        <Link to={`/admin/orders/${order.id}`}>
                                        {order.id}
                                        </Link>
                                    </TableCell>
                                    <TableCell >PRODUCT NAME</TableCell>
                                    <TableCell >quantity</TableCell>
                                    <TableCell >price</TableCell>
                                    <TableCell >total</TableCell>
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
