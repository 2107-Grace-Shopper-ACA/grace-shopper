import axios from "axios";

/**
 * ACTION TYPES
 */
const LOAD_PRODUCTS = "LOAD_PRODUCTS";

/**
 * ACTION CREATORS
 */
const _loadProducts = (products) => ({ type: LOAD_PRODUCTS, products });

/**
 * THUNK CREATORS
 */
export const loadProducts = () => {
  return async (dispatch) => {
    const { data: products } = await axios.get("/api/products");
    dispatch(_loadProducts(products));
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
