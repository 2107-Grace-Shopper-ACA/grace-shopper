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
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
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

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
      };
    
      const columns = [
        { title: 'Date', field: 'date' },
        { title: 'Purchaser', field: 'purchaser' },
        { title: 'In Cart', field: 'isCart', type: 'boolean' },
        // { title: 'Status', field: 'status', type: ''}
        { title: 'Items', field: 'totalitems' },
        { title: 'Total', field: 'total' },
      ];
      
      const data = [
          {
              date: order.date,
              purchaser: order.user.username,
              isCart: order.isCart,
              totalItems: totalItems,
              total: `$${total}`
          }
      ]

      const columns2 = [
        { title: 'Product Name', field: 'name' },
        { title: 'Quantity', field: 'quantity' },
        { title: 'Price', field: 'price' },
        { title: 'Subtotal', field: 'subtotal' },
      ];
      
      const data2= [orderItems.map(orderItem => {
          return (
              {
                  name: orderItem.product.name,
                  quantity: orderItem.quantity,
                  price: orderItem.product.price,
                  subtotal: orderItem.quantity * +orderItem.product.price
              }
          )
      })
      ]
    if (!order) return '...loading'

//styling    
    const header = {fontWeight: 'bold'}
//

        return (
            <div>
                <MaterialTable
                title="Order Details"
                icons={tableIcons}
                columns={columns}
                data={data}
                options={{
                    paging: false
                }}
                style={{
                    margin: '2rem'
                }}
                />
                <MaterialTable
                icons={tableIcons}
                columns={columns2}
                data={data2}
                options={{
                    paging: false
                }}
                />
                <TableContainer component={Paper} style={{width: '100%', overflowX: 'auto'}}>
                    <Table border={3} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
