import axios from "axios"

/**
 * ACTION TYPES
 */
 const LOAD_ORDERS = "LOAD_ORDERS"

 /**
  * ACTION CREATORS
  */
 const loadOrders = (orders) => ({ type: LOAD_ORDERS, orders });
 
 /**
  * THUNK CREATORS
  */
 export const fetchOrders = (userId) => {
   return async (dispatch) => {
     const { data: orders } = await axios.get(`/api/orders/${userId}`);
     dispatch(loadOrders(orders));
   };
 };
 
 /**
  * REDUCER (They do it differently in auth.js, but I opted for how I know how to do it. We can refactor as a group if we want. - Alex)
  */

 export default function (state = [], action) {
     switch(action.type) {
         case LOAD_ORDERS:
             return action.orders;
         default:
             return state
     }
 }