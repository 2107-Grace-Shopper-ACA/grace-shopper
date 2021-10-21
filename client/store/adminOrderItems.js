import axios from 'axios'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
 const LOAD_ADMIN_ORDERITEMS = 'LOAD_ADMIN_ORDERITEMS'
 
 /**
  * ACTION CREATORS
  */
 const _loadAdminOrderItems = (adminOrderItems) => ({ type: LOAD_ADMIN_ORDERITEMS, adminOrderItems });
//  const _createOrderItem = (orderItem) => ({ type: CREATE_ORDERITEM, orderItem})
//  const _editOrderItem = (orderItem) => ({ type: EDIT_ORDERITEM, orderItem})
 
 /**
  * THUNK CREATORS
  */

export const loadAdminOrderItems = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token){
      const orderItems = (await axios.get(`/api/admin/orderItems`, {
        headers: {
          authorization: token
        }
      })).data;
      dispatch(_loadAdminOrderItems(orderItems));
    }
  }
}

//  export const createOrderItem = (item) => {
//    return async(dispatch) => {
//      const { data: orderItem } = await axios.post('/api/orderItems', item);
//      dispatch(_createOrderItem(orderItem));
//    }
//  }

//  export const editOrderItem = (orderItem) => {
//    return async(dispatch) => {
//      const { data: updated } = await axios.put(`/api/orderItems/${orderItem.id}`, orderItem);
//      dispatch(_editOrderItem(updated));
//    }
//  }
 
 /**
  * REDUCER
  */

 export default function (state = [], action) {
     switch(action.type) {
         case LOAD_ADMIN_ORDERITEMS:
             return action.adminOrderItems;
        //  case CREATE_ORDERITEM:
        //      return [...state, action.orderItem];
        //  case EDIT_ORDERITEM:
        //      return state.map(orderItem => orderItem.id === action.orderItem.id ? action.orderItem : orderItem);
         default:
             return state
     }
 }