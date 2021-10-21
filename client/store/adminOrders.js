import axios from 'axios'

const TOKEN = 'token'


/**
 * ACTION TYPES
 */
 const LOAD_ADMIN_ORDERS = 'LOAD_ADMIN_ORDERS'
 /**
  * ACTION CREATORS
  */
 const _loadAdminOrders = (adminOrders) => ({ type: LOAD_ADMIN_ORDERS, adminOrders});
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
 /**
  * REDUCER
  */

 export default function (state = [], action) {
     switch(action.type) {
         case LOAD_ADMIN_ORDERS: 
             return action.adminOrders;
         default:
             return state
     }
 }