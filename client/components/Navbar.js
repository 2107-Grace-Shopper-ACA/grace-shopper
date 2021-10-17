import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, loadOrders} from '../store'

const Navbar = ({handleClick, isLoggedIn, orderItems}) => (
  <div>
    <h1>Pasta Peddler</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/products">Products</Link>
          <Link to="/home">Home</Link>
          <a href="#" onClick={()=>{
            handleClick()
            loadOrders()
          }}>
            Logout
          </a>
          <Link to ="/cart">Cart({orderItems.reduce((accu, cur) => {return accu + cur.quantity}, 0)})</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/products">Products</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to ="/cart">Cart({orderItems.reduce((accu, cur) => {return accu + cur.quantity}, 0)})</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    orderItems: state.orderItems
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    loadOrders() {
      dispatch(loadOrders())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
