import axios from 'axios'

const TOKEN = 'token'
/**
 * ACTION TYPES
 */
 const LOAD_USERS = 'LOAD_USERS'
 const ADD_USER = 'ADD_USER'
 const EDIT_USER = 'EDIT_USER'
 const EDIT_LOGGEDIN_USER = 'DIT_LOGGEDIN_USER'
 /**
  * ACTION CREATORS
  */
 const _loadUsers = (users) => ({ type: LOAD_USERS, users });
 const _addUser = (user) => ({ type: ADD_USER, user });
 const _editUser = (user) => ({ type: EDIT_USER, user });
 const _editLoggedInUser = (user) => ({type: EDIT_LOGGEDIN_USER, user})

 /**
  * THUNK CREATORS
  */
 //same as in orderitems, i think we should be fetch all orders and then work from there? so that way if an admin logs in or something they'll have access to all orders without having to create a separate action ...
 //but again i am confused by what the URIs will be for admin/vs not admin... i think we;ll have to use the authorization token or something in the routes in the api directory - C
 //Eventually we'll want to edit this to be user or admin specific - Alex
  
  export const loadUsers = () => {
    return async (dispatch) => {
     const token = window.localStorage.getItem(TOKEN);
     if (token){
       const { data: users } = await axios.get(`/api/admin/users`, {
         headers: {
           authorization: token
         }
       });
       dispatch(_loadUsers(users));
     }
   };
 };
 
 export const editUser = (user, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token){
      const edited = (await axios.put(`/api/admin/users/${user.id}`, user, {
        headers: {
          authorization: token
        }
      })).data;
      dispatch(_editUser(edited));
      history.push('/admin/users');
    }
  };
};

export const addUser = (user, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token){
      const added = (await axios.post(`/api/admin/users/`, user, {
        headers: {
          authorization: token
        }
      })).data;
      dispatch(_addUser(added));
      history.push('/admin/users');
    };
  }
};

export const editLoggedInUser = (user, history) => {
  return async (dispatch) => {
      const {data: edited} = await axios.put(`/api/users/${user.id}`, user)
      dispatch(_editLoggedInUser(edited));
      history.push('/users');
    }
  };
 /**
  * REDUCER
  */

 export default function (state = [], action) {
     switch(action.type) {
         case LOAD_USERS:
             return action.users;
         case EDIT_USER:
              return state.map(user => user.id === +action.user.id ? action.user : user)
         case ADD_USER: 
              return [...state, action.user]
         case EDIT_LOGGEDIN_USER:
              return state.map(user => user.id === +action.user.id ? action.user : user)
              
         default:
             return state
     }
 }