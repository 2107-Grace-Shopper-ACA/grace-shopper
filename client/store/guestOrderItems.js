
/**
 * ACTION TYPES
 */
 const SET_LOCAL_STORAGE = 'SET_LOCAL_STORAGE'
 const GET_LOCAL_STORAGE = 'GET_LOCAL_STORAGE'
 const EDIT_GUEST_ORDERITEMS = 'EDIT_GUEST_ORDERITEMS'


 /**
  * ACTION CREATORS
  */
 const _editGuestOrderItems = (orderItems) => ({ type: EDIT_GUEST_ORDERITEMS, orderItems});

 /**
  * THUNK CREATORS
  */
 export const setLocalStorage = () => {
     window.localStorage.setItem('guestOrderItems', guestOrderItems)
 }

 export const editGuestOrderItems = (orderItems) => {

   return (dispatch) => {
     dispatch(_editGuestCart(orderItems));
   };
 };


 /**
  * REDUCER
  */

 export default function (state = [], action) {
     switch(action.type) {
         case EDIT_GUEST_ORDERITEMS: 
             return state.map(orderItem => orderItem.id === action.orderItem.id ? action.orderItem : orderItem);
         default:
             return state
     }
 }