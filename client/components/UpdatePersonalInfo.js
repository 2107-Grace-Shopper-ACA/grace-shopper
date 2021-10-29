import React, { Component } from 'react'
import {connect} from 'react-redux'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { editLoggedInUser, update } from '../store'

class UpdatePersonalInfo extends Component {
    constructor(props){
        super(props);
        const {user} = this.props
        this.state = {
            username: user.id ? user.username : '',
            password: user.id ? user.password : '',
            email: user.id ? user.email : '',
            phoneNumber: user.id ? user.phoneNumber : '',
            streetAddress: user.id ? user.streetAddress : '',
            city: user.id ? user.city : '',
            state: user.id ? user.state : '',
            zipcode: user.id ? user.zipcode : '',
            error: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.formValidation = this.formValidation.bind(this)
    }
    
    componentDidUpdate (prevProps){
        if (prevProps.user.id !== this.props.user.id) {
            console.log("did update")
            const { username, password, email, phoneNumber, streetAddress, city, state, zipcode } = this.props.user;
            this.setState({ username, password, email, phoneNumber, streetAddress, city, state, zipcode });
        }
    }
    
    onChange(ev) {
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }

    formValidation = () => {
        const {username, password, email, phoneNumber, streetAddress, state, city, zipcode} = this.state
        let isValid = true
        const errors = {}
        if(username.trim().length < 3) {
            errors.usernameLength = 'Username must be at least 3 characters.'
            isValid = false
        }
        if(password.trim().length < 3) {
            errors.passwordLength = 'Password must be at least 3 characters.'
            isValid = false
        }
        if(!email.trim().includes('@')) {
            errors.emailFormat = 'Email must in valid format.'
            isValid = false
        }
        if(phoneNumber.trim().length !== 10) {
            errors.phoneNumberLength = 'Phone number must be 10 digits.'
            isValid = false
        }
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
        const { username, password, email, phoneNumber, streetAddress, city, state, zipcode } = this.state;
        const { history, editLoggedInUser, user } = this.props;
        if (isValid) {
            try{
                await editLoggedInUser({...user, username, password, email, phoneNumber, streetAddress, city, state, zipcode }, history);
                await update(Math.random())
            } 
            catch (ex){
                this.setState({error: ex.response.data.error}); 
            }
        }
    }
    render () {
        const { username, password, email, phoneNumber, streetAddress, city, state, zipcode, errors } = this.state;
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
                    <TextField name='username' value={username || ''} label='Username' onChange={onChange} >
                    </TextField>
                    <small style={{color: 'red'}}>{errors.usernameLength}</small>
                    <TextField name='password' value={password || ''} label='Password' onChange={onChange} >
                    </TextField>
                    <small style={{color: 'red'}}>{errors.passwordLength}</small>
                    <TextField name='email' value={email || ''} label='Email' type='email' onChange={onChange} >
                    </TextField>
                    <small style={{color: 'red'}}>{errors.emailFormat}</small>
                    <TextField name='phoneNumber' value={phoneNumber || ''} label='Phone Number' onChange={onChange} >
                    </TextField>
                    <small style={{color: 'red'}}>{errors.phoneNumberLength}</small>
                    <TextField name='streetAddress' value={streetAddress || ''} label='Street Address' onChange={onChange} >
                    </TextField>
                    <small style={{color: 'red'}}>{errors.streetAddressLength}</small>
                    <TextField name='city' value={city || ''} label='City' onChange={onChange} >
                    </TextField>
                    <small style={{color: 'red'}}>{errors.cityLength}</small>
                    <TextField name='state' value={state || ''} label='State' onChange={onChange} >
                    </TextField>
                    <small style={{color: 'red'}}>{errors.stateLength}</small>
                    <TextField name='zipcode' value={zipcode || ''} label='Zipcode' onChange={onChange} >
                    </TextField>
                    <small style={{color: 'red'}}>{errors.zipcodeLength}</small>
                    <Button disabled={!username || !password} onClick={onSubmit}>Edit User</Button>
                    {/* {Object.keys(errors).map((key)=>{
                        return <div key={key} style={{color: 'red'}}>{errors[key]}</div>
                    })} */}
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
        editLoggedInUser: (user) => dispatch(editLoggedInUser(user, history)),
        update: (num) => dispatch(update(num))
    }
}

export default connect(mapState, mapDispatch)(UpdatePersonalInfo)
