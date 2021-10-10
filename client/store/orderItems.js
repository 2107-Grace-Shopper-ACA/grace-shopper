import axios from "axios"

/**
 * ACTION TYPES
 */
 const LOAD_ORDERITEMS = "LOAD_ORDERITEMS"

 /**
  * ACTION CREATORS
  */
 const loadOrderItems = (orderItems) => ({ type: LOAD_ORDERITEMS, orderItems });
 
 /**
  * THUNK CREATORS
  */
 export const fetchOrderItems = (orderId) => {
   return async (dispatch) => {
     const { data: orderItems } = await axios.get(`/api/orderItems/${orderId}`);
     dispatch(loadOrderItems(orderItems));
   };
 };
 
 /**
  * REDUCER (They do it differently in auth.js, but I opted for how I know how to do it. We can refactor as a group if we want. - Alex)
  */

 export default function (state = [], action) {
     switch(action.type) {
         case LOAD_ORDERITEMS:
             return action.orderItems;
         default:
             return state
     }
 }