import React, { Component } from 'react'
import {connect} from 'react-redux'
import { editAdminOrderItem, deleteAdminOrderItem } from '../store'
/**
 * CLASS COMPONENT
 */

//getting warning about changing controlled input
//TODO: handle errors
class AdminOrderItemForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            quantity: '',
            error: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount(){
        console.log(this.props)
        const { quantity } = this.props.orderItem;
        this.setState({quantity})
    }
    // componentDidUpdate(prevProps){
    //     console.log(this.props)
    //     console.log(prevProps)
    // }

    onChange(ev) {
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }

    async onSubmit(ev){
        ev.preventDefault();
        const { quantity} = this.state;
        const { deleteOrderItem, editOrderItem, orderItem } = this.props;

        try{
            if (+quantity === 0){
                await deleteOrderItem(orderItem.id);
            }else {
                await editOrderItem({...orderItem, quantity});
            }
        } 
        catch (ex){
            console.log(ex);
            this.setState({error: ex.response});       
        }
    }
    

    render () {
        const { quantity} = this.state;
        const { onChange, onSubmit } = this;
        const { orderItem } = this.props;
        
        if (!orderItem) return "...loading"
        
        return (
            <div>
                <form onSubmit={onSubmit}>
                    <label>
                        Product Name: {orderItem.product.name}
                    </label>
                    <label>
                        Quantity: 
                        <select name='quantity' value={quantity} onChange={onChange}>
                            {
                                [0,1,2,3,4,5,6,7,8,9].map((idx) => {
                                    return (
                                        <option value={idx}>{idx}</option>
                                    )
                                })
                            }
                        </select>
                    </label>
                    <label>
                        Price: {orderItem.product.price}
                    </label>
                    <label>
                        Subtotal:{orderItem.product.price * orderItem.quantity}
                    </label>
                    <br/>
                    <button>Edit Item</button>
                </form>
            </div>
        )
    }
}

/**
 * CONTAINER
 */
// const mapState = (state, {match, history}) => {
//     return {
//         order: state.orders.find(order => order.id === match.params.id),
//         orderItems: state.orderItems.filter(item => item.orderId === match.params.id),
//         history: history
//     }
// }
const mapDispatch = (dispatch, {history}) => {
    return {
        editOrderItem: (orderItem) => dispatch(editAdminOrderItem(orderItem, history)),
        deleteOrderItem: (id) => dispatch(deleteAdminOrderItem(id))
    }
}

export default connect(null, mapDispatch)(AdminOrderItemForm)
