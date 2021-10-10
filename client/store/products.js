import axios from "axios";

/**
 * ACTION TYPES
 */
const LOAD_PRODUCTS = "LOAD_PRODUCTS";

/**
 * ACTION CREATORS
 */
const loadProducts = (products) => ({ type: LOAD_PRODUCTS, products });

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => {
  return async (dispatch) => {
    const { data: products } = await axios.get("/api/products");
    dispatch(loadProducts(products));
  };
};

/**
 * REDUCER (They do it differently in auth.js, but I opted for how I know how to do it. We can refactor as a group if we want. - Alex)
 */
export default function (state = [], action) {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
