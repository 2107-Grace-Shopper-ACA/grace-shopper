import axios from 'axios'

const TOKEN = 'token'


/**
 * ACTION TYPES
 */
 const LOAD_ADMIN_ORDERS = 'LOAD_ADMIN_ORDERS'
 const EDIT_ADMIN_ORDER = 'EDIT_ADMIN_ORDER'
 /**
  * ACTION CREATORS
  */
 const _loadAdminOrders = (adminOrders) => ({ type: LOAD_ADMIN_ORDERS, adminOrders});
 const _editAdminOrder = (adminOrder) => ({ type: EDIT_ADMIN_ORDER, adminOrder});
 /**
  * THUNK CREATORS
  */

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
export const editAdminOrder = (order, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token){
      const adminOrder = (await axios.put(`/api/admin/orders/${order.id}`, order, {
        headers: {
          authorization: token
        }
      })).data;
      dispatch(_editAdminOrder(adminOrder));
      history.goBack()
    }
  }
}
 /**
  * REDUCER
  */

 export default function (state = [], action) {
     switch(action.type) {
         case LOAD_ADMIN_ORDERS: 
             return action.adminOrders;
         case EDIT_ADMIN_ORDER: 
             return state.map(order => order.id === action.adminOrder.id ? action.adminOrder : order)
         default:
             return state
     }
 }