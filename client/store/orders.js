import axios from 'axios'

/**
 * ACTION TYPES
 */
 const LOAD_ORDERS = 'LOAD_ORDERS'
 const CREATE_ORDER = 'CREATE_ORDER'

 /**
  * ACTION CREATORS
  */
 const _loadOrders = (orders) => ({ type: LOAD_ORDERS, orders });
 const _createOrder = (order) => ({ type: CREATE_ORDER, order});
 /**
  * THUNK CREATORS
  */
 //same as in orderitems, i think we should be fetch all orders and then work from there? so that way if an admin logs in or something they'll have access to all orders without having to create a separate action ...
 //but again i am confused by what the URIs will be for admin/vs not admin... i think we;ll have to use the authorization token or something in the routes in the api directory - C
 //Eventually we'll want to edit this to be user or admin specific - Alex
 export const loadOrders = () => {
   console.log('loadOrders fired')
   return async (dispatch) => {
     const { data: orders } = await axios.get(`/api/orders`);
     dispatch(_loadOrders(orders));
   };
 };
 
 export const createOrder = (_order) => {
  return async (dispatch) => {
    const { data: order } = await axios.post(`/api/orders/`, _order);
    dispatch(_createOrder(order));
  };
};
 /**
  * REDUCER
  */

 export default function (state = [], action) {
     switch(action.type) {
         case LOAD_ORDERS:
             return action.orders;
         case CREATE_ORDER:
             return [...state, action.order];
         default:
             return state
     }
 }