import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import products from './products'
import orderItems from './orderItems'
import orders from './orders'
import users from './users'
import adminOrders from './adminOrders'
import adminOrderItems from './adminOrderItems'

const reducer = combineReducers({ auth, products, orderItems, orders, users, adminOrders, adminOrderItems })

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './products'
export * from './orderItems';
export * from './orders';
export * from './users';
export * from './adminOrders'
export * from './adminOrderItems'