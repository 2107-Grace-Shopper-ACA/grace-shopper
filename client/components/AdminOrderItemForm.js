import React, { Component } from 'react'
import {connect} from 'react-redux'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
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
        const { deleteOrderItem, editOrderItem, orderItem, handleClose } = this.props;

        try{
            if (+quantity === 0){
                await deleteOrderItem(orderItem.id);
            }else {
                await editOrderItem({id: orderItem.id, quantity});
            }
            handleClose()
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
                {/* <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                        backgroundColor: 'white'
                    }}
                    noValidate
                    autoComplete="off"
                >
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <TextField value={orderItem.name} label='Product Name' />
                    <TextField value={order.date || ''} label='Quantity' />
                    <TextField value={order.purchaser || ''} label='Purchaser' />
                    <TextField name='status' value={status || ''} label='Status' onChange={onChange} />
                    <FormControlLabel
                        control={
                            <Checkbox 
                                name='isCart' 
                                checked={isCart || ''} 
                                onChange={onChange}
                            />
                        }
                        label='Cart Order'
                    />
                    <Button onClick={onSubmit}>
                        Edit Order
                    </Button>
                </div>
            </Box> */}
                <form onSubmit={onSubmit}>
                    <label>
                        Product Name: {orderItem.name}
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
                        Price: {orderItem.price}
                    </label>
                    <label>
                        Subtotal:{orderItem.subtotal}
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
