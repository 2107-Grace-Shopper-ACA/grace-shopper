import React, { Component } from 'react'
import {connect} from 'react-redux'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { editCartUser } from '../store'

class CartAddress extends Component {
    constructor(props){
        super(props);
        const {user} = this.props
        this.state = {
            streetAddress: user.id ? user.streetAddress : '',
            city: user.id ? user.city : '',
            state: user.id ? user.state : '',
            zipcode: user.id ? user.zipcode : '',
            error: '',
            errors:{}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.formValidation = this.formValidation.bind(this)

    }
    
    componentDidUpdate (prevProps){
        if (!prevProps.user.id && this.props.user.id) {
            const { streetAddress, city, state, zipcode } = this.props.user;
            this.setState({ streetAddress, city, state, zipcode });
        }
    }
    
    onChange(ev) {
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }

    formValidation = () => {
        const {streetAddress, state, city, zipcode} = this.state
        let isValid = true
        const errors = {}
        if(streetAddress.trim().length < 1) {
            errors.streetAddressLength = 'Street address cannot be empty.'
            isValid = false
        }
        if(state.trim().length !== 2) {
            errors.stateLength = 'State must be 2 characters.'
            isValid = false
        }
        if(city.trim().length < 1) {
            errors.cityLength = 'City cannot be empty.'
            isValid = false
        }
        if(zipcode.trim().length !== 5) {
            errors.zipcodeLength = 'Zipcode must be 5 digits.'
            isValid = false
        }
        this.setState({errors})
        return isValid
    }

    async onSubmit(ev){
        ev.preventDefault();
        const isValid = this.formValidation()
        const { streetAddress, city, state, zipcode } = this.state;
        const { history, editCartUser, user } = this.props;
        if (isValid) {
            try{
                await editCartUser({...user, streetAddress, city, state, zipcode }, history);
            } 
            catch (ex){
                this.setState({error: ex.response.data.error});  
            }
        }
    }
    render () {
        const { streetAddress, city, state, zipcode, errors } = this.state;
        const { onChange, onSubmit } = this;

        if (!this.props.user) return '...loading'
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
                    <TextField name='streetAddress' value={streetAddress || ''} label='Street Address' onChange={onChange} />
                    <small style={{color: 'red'}}>{errors.streetAddressLength}</small>
                    <TextField name='city' value={city || ''} label='City' onChange={onChange} />
                    <small style={{color: 'red'}}>{errors.cityLength}</small>
                    <TextField name='state' value={state || ''} label='State' onChange={onChange} />
                    <small style={{color: 'red'}}>{errors.stateLength}</small>
                    <TextField name='zipcode' value={zipcode || ''} label='Zipcode' onChange={onChange} />
                    <small style={{color: 'red'}}>{errors.zipcodeLength}</small>
                    <Button onClick={onSubmit} disabled={!streetAddress || !city || !state || !zipcode}>
                        Confirm Address
                    </Button>
                </div>
            </Box>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = state => {
    return {
        auth: state.auth,
        user: state.user
    }
}
const mapDispatch = (dispatch, {history}) => {
    return {
        editCartUser: (user) => dispatch(editCartUser(user, history)),
    }
}

export default connect(mapState, mapDispatch)(CartAddress)