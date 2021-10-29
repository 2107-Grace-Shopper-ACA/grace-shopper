import React, { Component } from 'react'
import {connect} from 'react-redux'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { StyledTextField } from './StyledMUIComponents'
import { editAdminOrder, loadAdminOrders, loadAdminOrderItems } from '../store'

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
        const { editOrder, order, handleClose } = this.props;
        try{
            await editOrder({id: order.id, userId: order.userId, isCart, status});
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
                    backgroundColor: 'black'
                }}
                noValidate
                autoComplete="off"
            >
                <div style={{display: 'flex', flexDirection: 'column', border: '1px solid white', borderRadius: '4px'}}>
                    <StyledTextField value={order.id || ''} label='Order ID' />
                    <StyledTextField value={order.date || ''} label='Order Date' />
                    <StyledTextField value={order.purchaser || ''} label='Purchaser' />
                    <StyledTextField name='status' value={status || ''} label='Status' onChange={onChange} />
                    <FormControlLabel
                        control={
                            <Checkbox 
                                name='isCart' 
                                checked={isCart || ''} 
                                onChange={onChange}
                            />
                        }
                        style={{marginLeft: '1rem', color: 'white'}}
                        label='Cart Order'
                    />
                    <Button style={{backgroundColor: 'white', margin: '1rem'}} onClick={onSubmit}>
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
        editOrder: (order) => dispatch(editAdminOrder(order)),
        loadAdminOrders: () => dispatch(loadAdminOrders()),
        loadAdminOrderItems: () => dispatch(loadAdminOrderItems()),
    }
}

export default connect((state) => (state), mapDispatch)(AdminOrderForm)
