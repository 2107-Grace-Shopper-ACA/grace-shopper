import React, { Component } from 'react'
import {connect} from 'react-redux'
import { editAdminOrderItem, deleteAdminOrderItem } from '../store'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { StyledTextField } from './StyledMUIComponents';
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
        const { quantity } = this.props.orderItem;
        this.setState({quantity})
    }
    
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
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    backgroundColor: 'black'
                }}
                noValidate
                autoComplete="off"
            >
                <div style={{display: 'flex', flexDirection: 'column', border: '1px solid white', borderRadius: '4px'}}>
                    <StyledTextField value={orderItem.productName} label='Product Name' />
                    <label style={{color: '#ff2c61', marginLeft: '1rem', marginBottom: '1rem'}}>
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
                    <StyledTextField value={'$' + orderItem.price} label='Price' />
                    <StyledTextField value={'$' + orderItem.subtotal.toFixed(2)} label='Subtotal' />
                    <Button style={{backgroundColor: 'white', margin: '1rem'}} onClick={onSubmit} >Edit Item</Button>
                </div>
            </Box>
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
