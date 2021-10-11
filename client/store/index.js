import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import auth from './auth'
import products from './products'
import orderItems from './orderItems'
import orders from './orders'
import singleProduct from './singleProduct'

const reducer = combineReducers({ auth, products, orderItems, orders, singleProduct }) //Added in products - Alex
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
export * from './products' //Not entirely sure what we're accomplishing here yet but added it here to follow suit - Alex
//LOL this is that thing prof likes to do - it means you can call all actions from the store instead of their real files - Corinne
export * from './orderItems';
export * from './orders';
export * from './singleProduct';