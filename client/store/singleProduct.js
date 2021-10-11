import axios from 'axios'

/**
 * ACTION TYPES
 */
const LOAD_PRODUCT = 'LOAD_PRODUCT'

/**
 * ACTION CREATORS
 */
const loadProduct = (product) => ({type: LOAD_PRODUCT, product})

/**
 * THUNK CREATORS
 */
export const fetchProduct = (productId) => {
    return async (dispatch) => {
        const {data: product} = await axios.get(`/api/products/${productId}`)
        dispatch(loadProduct(product))
    }
}

/**
 * REDUCER
 */
export default function (state = {}, action ) {
    switch (action.type) {
        case LOAD_PRODUCT:
            return action.product;
        default:
            return state
    }

}