import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
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
        const { editOrder, history, order, handleClose} = this.props;
        try{
            await editOrder({id: order.id, userId: order.userId, isCart, status}, history);
            handleClose();
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
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    backgroundColor: 'white'
                }}
                noValidate
                autoComplete="off"
            >
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <TextField value={order.id || ''} label='Order ID' />
                    <TextField value={order.date || ''} label='Order Date' />
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
            </Box>
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
    }
}

export default connect((state) => (state), mapDispatch)(AdminOrderForm)
