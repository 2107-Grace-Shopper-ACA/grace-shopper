import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { Link, Route, withRouter } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminUsers from './AdminUsers';
import AdminSingleUser from './AdminSingleUser';
import AdminProducts from './AdminProducts';
import AdminSingleProduct from './AdminSingleProduct';
import AdminOrders from './AdminOrders';
import { loadAdminOrders, loadAdminOrderItems, loadUsers } from '../store';
/**
 * COMPONENT
 */
 export const Admin = ({username, loadUsers, loadAdminOrders, loadAdminOrderItems}) => {

  useEffect(() => {
    loadUsers();
    loadAdminOrders();
    loadAdminOrderItems();
  }, [])

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <Route path='/admin' component={AdminNavbar} />
      <Route path='/admin/users' exact component={AdminUsers} />
      <Route path='/admin/users/:id' exact component={AdminSingleUser} />
      <Route path='/admin/products' exact component={AdminProducts} />
      <Route path='/admin/products/:id' component={AdminSingleProduct} />
      <Route path='/admin/orders' exact component={AdminOrders} />
      <Route path='/admin/orders/products/:id' exact component={AdminOrders} />
    </div>

  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}
const mapDispatch = dispatch => {
  return {
    loadUsers: () => dispatch(loadUsers()),
    loadAdminOrders: () => dispatch(loadAdminOrders()),
    loadAdminOrderItems: () => dispatch(loadAdminOrderItems())
  }
}

export default withRouter(connect(mapState, mapDispatch)(Admin))
