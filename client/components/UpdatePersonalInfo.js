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
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    async onSubmit(ev){
        ev.preventDefault();
        const { username, password, email, phoneNumber, streetAddress, city, state, zipcode } = this.state;
        const { history, editLoggedInUser, user } = this.props;
        try{
            await editLoggedInUser({...user, username, password, email, phoneNumber, streetAddress, city, state, zipcode }, history);
            await update(Math.random())
        } 
        catch (ex){
            this.setState({error: ex.response.data.error}); 
        }
    }
    render () {
        const { username, password, email, phoneNumber, streetAddress, city, state, zipcode } = this.state;
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
                    <TextField name='username' value={username || ''} label='Username' onChange={onChange} error helperText='validation error'>
                    </TextField>
                    <TextField name='password' value={password || ''} label='Password' onChange={onChange} >
                    </TextField>
                    <TextField name='email' value={email || ''} label='Email' type='email' onChange={onChange} >
                    </TextField>
                    <TextField name='phoneNumber' value={phoneNumber || ''} label='Phone Number' onChange={onChange} >
                    </TextField>
                    <TextField name='streetAddress' value={streetAddress || ''} label='Street Address' onChange={onChange} >
                    </TextField>
                    <TextField name='city' value={city || ''} label='City' onChange={onChange} >
                    </TextField>
                    <TextField name='state' value={state || ''} label='State' onChange={onChange} >
                    </TextField>
                    <TextField name='zipcode' value={zipcode || ''} label='Zipcode' onChange={onChange} >
                    </TextField>
                    <Button disabled={!username || !password} onClick={onSubmit}>Edit User</Button>
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
