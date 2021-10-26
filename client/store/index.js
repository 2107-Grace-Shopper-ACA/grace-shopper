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
import categories from './categories'
import user from './user'
import update from './update'

const reducer = combineReducers({ auth, products, orderItems, orders, users, adminOrders, adminOrderItems, categories, user, update })

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
export * from './categories'
export * from './user'
export * from './update'
