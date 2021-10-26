import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { editAdminOrder, loadAdminOrders, loadAdminOrderItems, update } from '../store'
import AdminOrderItemForm from './AdminOrderItemForm';
/**
 * CLASS COMPONENT
 */

//getting warning about changing controlled input
//TODO: handle errors
class AdminOrderForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isCart: '',
            status: '',
            error: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount(){
        console.log(this.props)
        const { isCart, status } = this.props.order;
        this.setState({isCart, status});
    }

    onChange(ev) {
        const change = {};
        change[ev.target.name] = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
        this.setState(change);
    }

    async onSubmit(ev){
        ev.preventDefault();
        const { isCart, status} = this.state;
        const { editOrder, history, order, handleClose, update} = this.props;
        try{
            await editOrder({id: order.id, userId: order.userId, isCart, status}, history);
            await handleClose();
            update(Math.random());
        } 
        catch (ex){
            console.log(ex);
            this.setState({error: ex.response});       
        }
    }

    render () {
        const { isCart, status} = this.state;
        const { onChange, onSubmit } = this;
        const { order } = this.props;
        
        if (!order) return "...loading"
        
        return (
            <div>
                <form onSubmit={onSubmit}>
                    <label>
                        OrderID: {order.id}
                    </label>
                    <label>
                        Date: {order.date}
                    </label>
                    <label>
                        Purchaser: {order.purchaser}
                    </label>
                    <label>
                        Status:
                    </label>
                        <input name='status' value={status || ''} onChange={onChange} />
                    <label>
                        Cart Order
                    </label>
                        <input type='checkbox' name='isCart' checked={isCart || ''} onChange={onChange} />
                    <br/>
                    <button>Edit Order</button>
                </form>
            </div>
        )
    }
}

/**
 * CONTAINER
 */

const mapDispatch = (dispatch) => {
    return {
        editOrder: (order, history) => dispatch(editAdminOrder(order, history)),
        loadAdminOrders: () => dispatch(loadAdminOrders()),
        loadAdminOrderItems: () => dispatch(loadAdminOrderItems()),
        update: (num) => dispatch(update(num))
    }
}

export default connect((state) => (state), mapDispatch)(AdminOrderForm)
