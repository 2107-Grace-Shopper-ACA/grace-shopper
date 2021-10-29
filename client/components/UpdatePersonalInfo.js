import React, { Component } from 'react'
import {connect} from 'react-redux'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { StyledTextField } from './StyledMUIComponents'
import { editLoggedInUser, loadUser } from '../store'

class UpdatePersonalInfo extends Component {
    constructor(props){
        super(props);
        const {user} = this.props
        this.state = {
            username: user.id ? user.username : '',
            password: user.id ? user.password : '',
            email: user.id ? user.email : '',
            phoneNumber: user.id ? user.phoneNumber : '',
            streetAddress: '',
            city: user.id ? user.city : '',
            state: user.id ? user.state : '',
            zipcode: user.id ? user.zipcode : '',
            error: '',
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount (){
        const { username, password, email, phoneNumber, streetAddress, city, state, zipcode } = this.props.user;
        this.setState({ username, password, email, phoneNumber, streetAddress, city, state, zipcode });
    }

    componentDidUpdate (prevProps){
        if (prevProps.user.id !== this.props.user.id) {
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
        const { history, editLoggedInUser, user, loadUser } = this.props;
        try{
            await editLoggedInUser({...user, username, password, email, phoneNumber, streetAddress, city, state, zipcode }, history);
            await loadUser(this.props.auth)
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
                backgroundColor: 'black',
                border: '1px solid white',
                borderRadius: '4px'
            }}
            noValidate
            autoComplete="off"
            >
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <StyledTextField name='username' value={username || ''} label='Username' onChange={onChange} />
                    <StyledTextField name='password' value={password || ''} label='Password' onChange={onChange} />
                    <StyledTextField name='email' value={email || ''} label='Email' onChange={onChange} />
                    <StyledTextField name='phoneNumber' value={phoneNumber || ''} label='Phone Number' onChange={onChange} />
                    <StyledTextField name='streetAddress' value={streetAddress || ''} label='Street Address' onChange={onChange} />
                    <StyledTextField name='city' value={city || ''} label='City' onChange={onChange} />
                    <StyledTextField name='state' value={state || ''} label='State' onChange={onChange} />
                    <StyledTextField name='zipcode' value={zipcode || ''} label='Zipcode' onChange={onChange} />
                    <Button style={{backgroundColor: 'white'}} disabled={!username || !password} onClick={onSubmit}>Edit User</Button>
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
        user: state.user,
    }
}
const mapDispatch = (dispatch, {history}) => {
    return {
        editLoggedInUser: (user) => dispatch(editLoggedInUser(user, history)),
        update: () => dispatch(update(Math.random())),
        loadUser: (auth) => dispatch(loadUser(auth))
    }
}

export default connect(mapState, mapDispatch)(UpdatePersonalInfo)
