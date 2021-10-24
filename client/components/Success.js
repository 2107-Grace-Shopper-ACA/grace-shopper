import React, {Component} from 'react'
import {connect} from 'react-redux'
import { useHistory } from 'react-router'
import { editOrder, createOrder, editProduct } from '../store'
/**
 * COMPONENT
 */
const Success = ({auth, order, editOrder, createOrder, orderItems, editProduct, products}) => {
    const history = useHistory();
    
    products = products.filter(product => {
        for (let item of orderItems){
            if(item.productId === product.id) return true
        }
    }).sort((a,b) => a.id < b.id);
    
    const newInventory = products.map(product => {
        for (let item of orderItems){
            if(item.productId === product.id) {
                return product.inventory - item.quantity;
            }
        }
    });

    const handleClick = async() => {
        
        await editOrder({...order, date: new Date(), isCart: false});
        await createOrder({userId: auth.id, isCart: true});
        await Promise.all(products.map((product, idx) => {
            if (newInventory[idx] > 0){
                editProduct({...product, inventory: newInventory[idx]});
            } else {
                editProduct({...product, inventory: newInventory[idx], isActive: false});
            }
        }))
        history.push('/home');
    }
    
  
    return (
        <div>
        <h3>Success, {auth.username}</h3>
        <div>TODO: ORDER INFO</div>
        <button onClick={handleClick}>BACK TO HOME</button>
        </div>
    )
  
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    auth: state.auth,
    order: state.orders.find(order => order.isCart),
    orderItems: state.orderItems.filter(item => item.order.isCart),
    products: state.products
  }
}
const mapDispatch = dispatch => {
    return {
        editOrder: (order) => dispatch(editOrder(order)),
        createOrder: (order) => dispatch(createOrder(order)),
        editProduct: (product) => dispatch(editProduct(product))
    }
}

export default connect(mapState, mapDispatch)(Success)
