import axios from "axios";

/**
 * ACTION TYPES
 */
const LOAD_PRODUCTS = "LOAD_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
/**
 * ACTION CREATORS
 */
const _loadProducts = (products) => ({ type: LOAD_PRODUCTS, products });
const _addProduct = (product) => ({ type: ADD_PRODUCT, product });
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

export const addProduct = (product) => {
  return async (dispatch) => {
    const { data: added } = await axios.post("/api/admin/products", product);
    dispatch(_addProduct(added));
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/admin/products/${id}`);
    dispatch(_deleteProduct(id));
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.product]
    case DELETE_PRODUCT: 
      return state.filter(product => product.id !== +action.id)
    default:
      return state;
  }
}
