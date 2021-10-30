import React, { Component } from 'react'
import {connect} from 'react-redux'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import { editCartUser, loadUser } from '../store'
import { StyledTextField } from './StyledMUIComponents'
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
        if (prevProps.auth.id && !this.props.auth.id) {
            this.setState({streetAddres: '', city: '', state: '', zipcode: ''})
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

        const { history, editCartUser, user, loadUser, auth } = this.props;
        if (isValid) {

        try{
            await editCartUser({...user, streetAddress, city, state, zipcode }, history);
            await loadUser(auth);
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
                    backgroundColor: 'black',
                    borderRadius: 10,
                    boxShadow: '0 0px 7px 7px #ffffff',
                    margin: '0 3rem 0 3rem'
                }}
                noValidate
                autoComplete="off"
                display='flex'
                flexDirection='column'
                padding='1rem'
            >   
                <StyledTextField name='streetAddress' value={streetAddress || ''} label='Street Address' onChange={onChange} />
                    <small style={{color: 'red'}}>{errors.streetAddressLength}</small>
                                        
                <StyledTextField name='city' value={city || ''} label='City' onChange={onChange} />
                    <small style={{color: 'red'}}>{errors.cityLength}</small>
                                        
                <StyledTextField name='state' value={state || ''} label='State' onChange={onChange} />
                    <small style={{color: 'red'}}>{errors.stateLength}</small>
                <StyledTextField name='zipcode' value={zipcode || ''} label='Zipcode' onChange={onChange} />
                    <small style={{color: 'red'}}>{errors.zipcodeLength}</small>
                <Button 
                    style={{
                        borderRadius: 10,
                        background: 'linear-gradient(45deg, #ff2c61, #ff6c61)',
                        color: 'white',
                        boxShadow: '0 0px 3px 3px #1e23b0',
                        width: '40%',
                        alignSelf: 'center'
                    }} 
                    onClick={onSubmit} 
                    disabled={!streetAddress || !city || !state || !zipcode}
                >
                    Confirm Address
                </Button>
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
        loadUser: (auth) => dispatch(loadUser(auth))
    }
}

export default connect(mapState, mapDispatch)(CartAddress)