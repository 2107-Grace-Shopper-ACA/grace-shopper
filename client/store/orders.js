import axios from 'axios'

const TOKEN = 'token'


/**
 * ACTION TYPES
 */
 const LOAD_ORDERS = 'LOAD_ORDERS'
 const CREATE_ORDER = 'CREATE_ORDER'
 const EDIT_ORDER = 'EDIT_ORDER'
//  const LOAD_ADMIN_ORDERS = 'LOAD_ADMIN_ORDERS'
 /**
  * ACTION CREATORS
  */
 const _loadOrders = (orders) => ({ type: LOAD_ORDERS, orders });
 const _createOrder = (order) => ({ type: CREATE_ORDER, order});
 const _editOrder = (order) => ({ type: EDIT_ORDER, order});
//  const _loadAdminOrders = (orders) => ({ type: LOAD_ADMIN_ORDERS, orders});
 /**
  * THUNK CREATORS
  */
 //same as in orderitems, i think we should be fetch all orders and then work from there? so that way if an admin logs in or something they'll have access to all orders without having to create a separate action ...
 //but again i am confused by what the URIs will be for admin/vs not admin... i think we;ll have to use the authorization token or something in the routes in the api directory - C
 export const loadOrders = () => {
   const token = window.localStorage.getItem(TOKEN)

   return async (dispatch) => {
     const { data: orders } = await axios.get(`/api/orders`, {
      headers: {
        authorization: token
      }
    });
     dispatch(_loadOrders(orders));
   };
 };
 //TODO: add try catches? do these need to be protected w token?
 
 export const createOrder = (_order) => {
  return async (dispatch) => {
    const { data: order } = await axios.post(`/api/orders/`, _order);
    dispatch(_createOrder(order));
  };
};
export const editOrder = (_order) => {
  return async (dispatch) => {
    const { data: order } = await axios.put(`/api/orders/${_order.id}`, _order);
    dispatch(_editOrder(order));
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
         case EDIT_ORDER: 
             return state.map(order => order.id === action.order.id ? action.order : order);
         default:
             return state
     }
 }