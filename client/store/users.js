import axios from 'axios'

/**
 * ACTION TYPES
 */
 const LOAD_USERS = 'LOAD_USERS'

 /**
  * ACTION CREATORS
  */
 const _loadUsers = (users) => ({ type: LOAD_USERS, users });

 /**
  * THUNK CREATORS
  */
 //same as in orderitems, i think we should be fetch all orders and then work from there? so that way if an admin logs in or something they'll have access to all orders without having to create a separate action ...
 //but again i am confused by what the URIs will be for admin/vs not admin... i think we;ll have to use the authorization token or something in the routes in the api directory - C
 //Eventually we'll want to edit this to be user or admin specific - Alex
 export const loadUsers = () => {
   return async (dispatch) => {
     const { data: users } = await axios.get(`/api/admin/users`);
     dispatch(_loadUsers(users));
   };
 };
 
 /**
  * REDUCER
  */

 export default function (state = [], action) {
     switch(action.type) {
         case LOAD_USERS:
             return action.users;
         default:
             return state
     }
 }