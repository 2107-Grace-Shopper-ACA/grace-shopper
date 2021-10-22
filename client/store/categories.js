import axios from 'axios'

/**
 * ACTION TYPES
 */
 const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
 
 /**
  * ACTION CREATORS
  */
 const _loadCategories = (categories) => ({ type: LOAD_CATEGORIES, categories });
 
 /**
  * THUNK CREATORS
  */
 
 export const loadCategories = () => {

   return async (dispatch) => {
     const { data: categories } = await axios.get(`/api/categories`);
     dispatch(_loadCategories(categories));
   };
 };
 
 /**
  * REDUCER
  */

 export default function (state = [], action) {
     switch(action.type) {
         case LOAD_CATEGORIES:
             return action.categories;
         default:
             return state
     }
 }