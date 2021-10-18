import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {me, loadProducts, loadOrders, loadOrderItems} from './store'
import Cart from './components/Cart'
import Products from './components/Products';
import SingleProduct from './components/SingleProduct';
import Orders from './components/Orders';
import SingleOrder from './components/SingleOrder';
import Settings from './components/Settings';


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.loadProducts()
    this.props.loadOrders()
    this.props.loadOrderItems()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route path="/products" exact component={Products} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/orders/:orderId" component={SingleOrder} />
            <Route path="/settings" component={Settings} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path='/' exact component={ Login } />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/cart" component={Cart} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route path="/products" exact component={Products} />
          </Switch>
        )}

      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    loadProducts(){
      dispatch(loadProducts())
    },
    loadOrders(){
      dispatch(loadOrders())
    },
    loadOrderItems(){
      dispatch(loadOrderItems())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
