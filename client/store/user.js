import axios from 'axios'

const TOKEN = 'token'
/**
 * ACTION TYPES
 */

 const LOAD_USER = 'LOAD_USER'

 /**
  * ACTION CREATORS
  */

 const _loadUser = (user) => ({ type: LOAD_USER, user });

 /**
  * THUNK CREATORS
  */

 export const loadUser = (auth) => {
  return async (dispatch) => {
   const token = window.localStorage.getItem(TOKEN);
   if (token){
     const { data: user } = await axios.get(`/api/users/${auth.id}`, {
       headers: {
         authorization: token
       }
     });
     dispatch(_loadUser(user));
   }
 };
};
 
 /**
  * REDUCER
  */

 export default function (state = [], action) {
     switch(action.type) {
         case LOAD_USER:
             return action.user;
         default:
             return state
     }
 }