import React, {useEffect, forwardRef} from 'react'
import { useState } from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import {loadAdminOrders, loadAdminOrderItems} from '../store';
import AdminOrderForm from './AdminOrderForm';
import AdminOrderItemForm from './AdminOrderItemForm';
import Dialog from '@material-ui/core/Dialog';

import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
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
const AdminOrders = ({orders, orderItems, match, products, loadAdminOrders}) => {
    const totalQuantities = orderItems.reduce((accum, item) => {
        accum += item.quantity;
        return accum;
    }, 0)

    useEffect(() => {
        async function loadData (){
            await loadAdminOrders();
            await loadAdminOrderItems();
        };
        loadData();
    }, [totalQuantities]);
    
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
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

    let displayOrders, product;

    if (match.path.includes('products')){
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
    
    displayOrders = displayOrders.sort((a,b) => a.user.username < b.user.username ? -1 : 1)
        .map(order => {
        const totalQuantity = order.orderItems.reduce((accum, item) => {
            accum += item.quantity;
            return accum;
        }, 0);
        const total = orderItems.filter(orderItem => orderItem.orderId === order.id).
            reduce((accum, orderItem) => {
                accum += +orderItem.product.price * orderItem.quantity; 
                return accum;
            }, 0)
        return (
            {
                ...order,
                totalQuantity,
                total
            }
        )
    })
    // Material Table Columns
    const columns = [
    { title: 'Date Ordered', field: 'date', type: 'datetime', filtering: false },
    { title: 'Order ID', field: 'orderId', filtering: false,
        cellStyle: {
            width: 20,
            maxWidth: 20,
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden',
        },
        headerStyle: {
            width: 20,
            maxWidth: 20
        }
    },
    { title: 'Cart Order', field: 'isCart', type: 'boolean'},
    { title: 'Purchaser', field: 'purchaser', filtering: false},
    { title: 'Total Items', field: 'totalItems', type: 'numeric', filtering: false},
    { title: 'Total', field: 'total', type: 'currency', filtering: false},

    ];


    // Material Table Rows
    const data = displayOrders.map( order => {
        return (
            {
                date: order.date, 
                orderId: order.id, 
                isCart: order.isCart ,
                purchaser: order.user.username,
                totalItems: order.totalQuantity,
                total: order.total,
                orderDetail: order.orderItems.map(item => {
                    return (
                        {
                        date: item.updatedAt,
                        id: item.id,
                        productName: item.product.name,
                        quantity: item.quantity,
                        price: item.product.price,
                        subtotal: item.quantity * +item.product.price
                        }
                    )
                }),
                id: order.id,
                status: order.status,
                userId: order.userId
            }
        )
    });
//dialog box
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState({});
    const handleOpen = (ev, order) => {
        // ev.persist()
        setOrder(order);
        setOpen(true);
    }
    const handleClose = async (ev) => {
        setOpen(false);
        setOrder('')
    }
    const [openItem, setOpenItem] = useState(false);
    const [orderItem, setOrderItem] = useState({});
    const handleOpenItem = (ev, orderItem) => {
        // ev.persist()
        setOrderItem(orderItem);
        setOpenItem(true);
    }
    const handleCloseItem = async (ev) => {
        setOpenItem(false);
        setOrderItem('')
    }
//

    if (!displayOrders.length) {
        return '...loading';
    }   

    return (
        <div>
            <Dialog onClose={handleClose} open={open}>
                <AdminOrderForm handleClose={handleClose} order={order}/>
            </Dialog>
            <Dialog onClose={handleCloseItem} open={openItem}>
                <AdminOrderItemForm handleClose={handleCloseItem} orderItem={orderItem}/>
            </Dialog>
            <MaterialTable
                title={match.path.includes('products') ? `${product.name} Orders` : "Orders"}
                icons={tableIcons}
                columns={columns}
                data={data}
                options={{
                    filtering: true,
                    headerStyle: {
                        color: 'white',
                        background: '#3523d9',
                    }
                }}
                actions={[
                    {
                        icon: Edit,
                        tooltip: 'Edit Order',
                        isFreeAction: false,
                        onClick: (ev,rowData) => handleOpen(ev, rowData)
                    }
                ]}
                style={{
                    margin: '2rem',
                    color: 'black',
                    borderRadius: 10,
                    boxShadow: '0 0px 7px 7px #ffffff',
                    backgroundColor: 'lightSteelBlue'
                }}
                detailPanel={rowData => {
                    return (
                        <MaterialTable
                            
                            icons={tableIcons}
                            columns={[
                                { title: 'Date Added to Cart', field: 'date', type: 'datetime'},
                                { title: 'Order Item ID', field: 'id',
                                cellStyle: {
                                    width: 10,
                                    maxWidth: 10,
                                    textOverflow: 'ellipsis', 
                                    whiteSpace: 'nowrap', 
                                    overflow: 'hidden',
                                },
                                headerStyle: {
                                    width: 10,
                                    maxWidth: 10
                                }
                                },
                                { title: 'Product Name', field: 'productName'},
                                { title: 'Quantity', field: 'quantity' },
                                { title: 'Price', field: 'price', type: 'currency' },
                                { title: 'Subtotal', field: 'subtotal', type: 'currency' },
                              ]}
                            data={rowData.orderDetail}
                            options={{
                                paging: false,
                                search: false,
                                toolbar: false,
                                headerStyle: {
                                    color: 'black',
                                    background: '#ff820d',
                                }
                            }}
                            actions={[
                                {
                                    icon: Edit,
                                    tooltip: 'Edit Order',
                                    isFreeAction: false,
                                    onClick: (ev,rowData) => handleOpenItem(ev, rowData)
                                }
                            ]}
                            style={{
                                backgroundColor: "lightSteelBlue"
                            }}
                        />
                    );
                }}
            />
        </div>
    )
}

/**
 * CONTAINER
 */
const mapState = (state, {match}) => {
  return {
    orders: state.adminOrders,
    orderItems: state.adminOrderItems,
    match: match,
    products: state.products,
  }
}
const mapDispatch = dispatch => {
    return {
        loadAdminOrderItems: () => dispatch(loadAdminOrderItems()),
        loadAdminOrders: () => dispatch(loadAdminOrders()),
    }
}

export default connect(mapState, mapDispatch)(AdminOrders)
