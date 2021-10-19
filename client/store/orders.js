import axios from 'axios'
const TOKEN = 'token'
/**
 * ACTION TYPES
 */
 const LOAD_ORDERS = 'LOAD_ORDERS'
 const CREATE_ORDER = 'CREATE_ORDER'
 const LOAD_ADMIN_ORDERS = 'LOAD_ADMIN_ORDERS'
 /**
  * ACTION CREATORS
  */
 const _loadOrders = (orders) => ({ type: LOAD_ORDERS, orders });
 const _createOrder = (order) => ({ type: CREATE_ORDER, order});
 const _loadAdminOrders = (orders) => ({ type: LOAD_ADMIN_ORDERS, orders});
 /**
  * THUNK CREATORS
  */
 //same as in orderitems, i think we should be fetch all orders and then work from there? so that way if an admin logs in or something they'll have access to all orders without having to create a separate action ...
 //but again i am confused by what the URIs will be for admin/vs not admin... i think we;ll have to use the authorization token or something in the routes in the api directory - C
 //Eventually we'll want to edit this to be user or admin specific - Alex
 export const loadOrders = () => {
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

export const loadAdminOrders = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token){
      const orders = (await axios.get(`/api/admin/orders`, {
        headers: {
          authorization: token
        }
      })).data;
      dispatch(_loadAdminOrders(orders));
    }
  }
}
 /**
  * REDUCER
  */

 export default function (state = [], action) {
     switch(action.type) {
         case LOAD_ORDERS:
             return action.orders;
         case CREATE_ORDER:
             return [...state, action.order];
//THIS IS NEVER GETTING CALLED??
         case LOAD_ADMIN_ORDERS: 
             return [...state, action.orders];
         default:
             return state
     }
 }