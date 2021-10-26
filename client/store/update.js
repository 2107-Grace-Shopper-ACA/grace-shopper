import axios from 'axios'

/**
 * ACTION TYPES
 */
 const UPDATE = 'UPDATE'
 
 /**
  * ACTION CREATORS
  */
 export const update = (num) => ({ type: UPDATE, num });
 
 /**
  * THUNK CREATORS
  */
 
 /**
  * REDUCER
  */

 export default function (state = 0, action) {
     switch(action.type) {
         case UPDATE:
             return action.num;
         default:
             return state
     }
 }