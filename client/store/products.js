import axios from "axios";

const TOKEN = 'token'
/**
 * ACTION TYPES
 */
const LOAD_PRODUCTS = "LOAD_PRODUCTS";
const EDIT_PRODUCT = "EDIT_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
/**
 * ACTION CREATORS
 */
const _loadProducts = (products) => ({ type: LOAD_PRODUCTS, products });
const _editProduct = (product) => ({ type: EDIT_PRODUCT, product });
const _deleteProduct = (id) => ({ type: DELETE_PRODUCT, id});
/**
 * THUNK CREATORS
 */
export const loadProducts = () => {
  return async (dispatch) => {
    const { data: products } = await axios.get("/api/products");
    dispatch(_loadProducts(products));
  };
};

export const editProduct = (product) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token){
      const edited = (await axios.put(`/api/admin/products/${product.id}`, product, {
        headers: {
          authorization: token
        }
      })).data;
      dispatch(_editProduct(edited));
    }
  };
};
//it will only work if i format it the second way?
export const deleteProduct = (id, history) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token){
      // await axios.delete(`/api/admin/products/${id}`), {
      //   headers: {
      //     authorization: token
      //   }
      await axios({
        url: `/api/admin/products/${id}`,
        method: 'delete',
        data: id,
        headers: {
          authorization: token
        }
      })
      dispatch(_deleteProduct(id));
      history.push('/admin/products')

    };
    }
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.products;
    case EDIT_PRODUCT:
      return state.map(product => product.id === action.product.id ? action.product : product)
    case DELETE_PRODUCT: 
      return state.filter(product => product.id !== action.id)
    default:
      return state;
  }
}
