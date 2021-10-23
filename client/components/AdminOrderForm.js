import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import { editAdminOrder, loadAdminOrders, loadAdminOrderItems } from '../store'
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
        const { isCart, status } = this.props.order;
        // console.log(this.props)
        this.setState({isCart, status});
    }
    // componentDidUpdate(prevProps){
    //     console.log(prevProps)
    //     console.log(this.props)
    //     if(prevProps.orderItems !== this.props.orderItems) {
    //         loadAdminOrderItems();
    //     }
    // }

    onChange(ev) {
        const change = {};
        change[ev.target.name] = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
        this.setState(change);
    }

    async onSubmit(ev){
        ev.preventDefault();
        const { isCart, status} = this.state;
        const { editOrder, order, history } = this.props;
        try{
            await editOrder({...order, isCart, status}, history);
        } 
        catch (ex){
            console.log(ex);
            this.setState({error: ex.response});       
        }
    }

    render () {
        const { isCart, status} = this.state;
        const { onChange, onSubmit } = this;
        const { order, orderItems } = this.props;
        console.log(order)
        console.log(orderItems)
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
                        Purchaser: {order.user.username}
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
                {/* <h3>Order Items</h3>
                <ul>
                    {
                        orderItems.map(item => {
                            return (
                                <li key={item.id}>
                                    {
                                        <Link to={`/admin/orderItems/${item.id}`}>
                                            {item.product.name}
                                        </Link>
                                    }
                                    'TODO: ADD MORE'
                                </li>
                            )
                        })
                    }
                </ul> */}
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
        loadAdminOrderItems: () => dispatch(loadAdminOrderItems())
    }
}

export default connect(null, mapDispatch)(AdminOrderForm)
