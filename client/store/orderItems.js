import axios from 'axios'

/**
 * ACTION TYPES
 */
 const LOAD_ORDERITEMS = 'LOAD_ORDERITEMS'
 const CREATE_ORDERITEM = 'CREATE_ORDERITEM'
 /**
  * ACTION CREATORS
  */
 const loadOrderItems = (orderItems) => ({ type: LOAD_ORDERITEMS, orderItems });
 const _createOrderItem = (orderItem) => ({ type: CREATE_ORDERITEM, orderItem})
 
 /**
  * THUNK CREATORS
  */
 
 //to stay consistent, do you think that fetch<whatever> should load all of those things? and then from there we can filter to see which items are in a specific order? i think doing it the way it is below has the potential to mess things up when stuff gets updated even though it seems like it shouldn't... - C
 export const fetchOrderItems = (orderId) => {
   return async (dispatch) => {
     const { data: orderItems } = await axios.get(`/api/orderItems/${orderId}`);
     dispatch(loadOrderItems(orderItems));
   };
 };

 export const createOrderItem = (item) => {
   return async(dispatch) => {
     const { data: orderItem } = await axios.post('/api/orderItems', item);
     dispatch(_createOrderItem(orderItem));
   }
 }
 
 /**
  * REDUCER
  */

 export default function (state = [], action) {
     switch(action.type) {
         case LOAD_ORDERITEMS:
             return action.orderItems;
         case CREATE_ORDERITEM:
             return [...state, action.orderItem];
         default:
             return state
     }
 }