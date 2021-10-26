import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import {me, loadProducts, loadOrders, loadOrderItems, loadCategories} from './store'
import Cart from './components/Cart'
import Products from './components/Products';
import SingleProduct from './components/SingleProduct';
import Admin from './components/Admin';
import Orders from './components/Orders';
import SingleOrder from './components/SingleOrder';
import UpdatePersonalInfo from './components/UpdatePersonalInfo';
import Success from './components/Success'



/**
 * COMPONENT
 */
class Routes extends Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  //TODO Build out to load orders each time there is a change in user - Alex
  componentDidUpdate(prevProps) {
    if((!prevProps.auth.id && this.props.auth.id) || (prevProps.auth.id !== this.props.auth.id)){
      this.props.loadOrders()
      this.props.loadOrderItems() //Toggling this comment while debugging
    }
    // let localCart = JSON.parse(localStorage.getItem('localCart')) || [];
    // if()
  }

  render() {
    const {isLoggedIn, auth} = this.props

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/checkout/success" exact component={Success} />
            <Route path="/home" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/products/:productId" component={SingleProduct} />
            <Route path="/products" exact component={Products} />
            {
              !!auth.isAdmin && <Route path="/admin" component={Admin} />
            }
            <Route path="/orders" exact component={Orders} />
            <Route path="/updatePersonalInfo" component={UpdatePersonalInfo} />
            <Route path="/orders/:orderId" exact component={SingleOrder} />
            <Route path="/checkout/cancel" component={Cart} />
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
    isLoggedIn: !!state.auth.id,
    auth: state.auth
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(loadProducts());
      dispatch(loadOrders());
      dispatch(loadOrderItems());
      dispatch(loadCategories());
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
