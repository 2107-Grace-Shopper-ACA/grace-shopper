import axios from 'axios'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
 const LOAD_ADMIN_ORDERITEMS = 'LOAD_ADMIN_ORDERITEMS'
 const EDIT_ADMIN_ORDERITEM = 'EDIT_ADMIN_ORDERITEM'
 const DELETE_ADMIN_ORDERITEM = 'DELETE_ADMIN_ORDERITEM'
 /**
  * ACTION CREATORS
  */
 const _loadAdminOrderItems = (adminOrderItems) => ({ type: LOAD_ADMIN_ORDERITEMS, adminOrderItems });
 const _editAdminOrderItem = (orderItem) => ({ type: EDIT_ADMIN_ORDERITEM, orderItem});
 const _deleteAdminOrderItem = (id) => ({ type: DELETE_ADMIN_ORDERITEM, id});
 
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

 export const deleteAdminOrderItem = (id) => {
   return async(dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token){
      await axios.delete(`/api/admin/orderItems/${id}`, {
        headers: {
          authorization: token
        }
      });
     dispatch(_deleteAdminOrderItem(id));
   }
 }
}

 export const editAdminOrderItem = (item, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token){
      const adminOrderItem = (await axios.put(`/api/admin/orderItems/${item.id}`, item, {
        headers: {
          authorization: token
        }
      })).data;
      dispatch(_editAdminOrderItem(adminOrderItem));
      // history.push(`admin/orders/${adminOrderItem.orderId}`)
      history.goBack()
    }
  }
}
 
 /**
  * REDUCER
  */

 export default function (state = [], action) {
     switch(action.type) {
         case LOAD_ADMIN_ORDERITEMS:
             return action.adminOrderItems;
         case DELETE_ADMIN_ORDERITEM:
             return state.filter(item => item.id !== action.id)
         case EDIT_ADMIN_ORDERITEM:
             return state.map(item => item.id === action.orderItem.id ? action.orderItem : item);
         default:
             return state
     }
 }