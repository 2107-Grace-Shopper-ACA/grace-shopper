import React, { Component } from 'react'
import {connect} from 'react-redux'
import { addUser, editUser, logout, loadUser } from '../store'
import { StyledTextField } from './StyledMUIComponents';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
/**
 * CLASS COMPONENT
 */

//TODO: handle errors
class AdminUserForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            phoneNumber: '',
            streetAddress: '',
            city: '',
            state: '',
            zipcode: '',
            isAdmin: false,
            error: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount(){
        if (this.props.action === 'edit'){
            console.log(this.props.user)
            const { username, password, isAdmin, email, phoneNumber, streetAddress, city, state, zipcode } = this.props.user;
            this.setState({ username, password, isAdmin, email, phoneNumber, streetAddress, city, state, zipcode });
        }
    }
    
    onChange(ev) {
        const change = {};
        change[ev.target.name] = ev.target.type === 'checkbox' ?  ev.target.checked : ev.target.value;
        this.setState(change);
    }

    async onSubmit(ev){
        ev.preventDefault();
        const { username, isAdmin, password, email, phoneNumber, streetAddress, city, state, zipcode } = this.state;
        const { history, handleClose, action, editUser, addUser, user, auth, loadUser } = this.props;
        try{
            if(action === 'edit'){
                await editUser({...user, username, isAdmin, email, phoneNumber, streetAddress, city, state, zipcode}, history);
            } else {
                await addUser({username, password, isAdmin, email, phoneNumber, streetAddress, city, state, zipcode}, history);
            }
            user.id === auth.id ? loadUser(auth) : '';
            handleClose();
        } 
        catch (ex){
            console.log(ex);
            this.setState({error: ex.response.data.error});       
        }
    }
    render () {
        const { username, isAdmin, password, email, phoneNumber, streetAddress, city, state, zipcode } = this.state;
        const { onChange, onSubmit } = this;
        const { action, auth, user } = this.props;

        if (action === 'edit' && !user) return '...loading'
        return (
            <div
            style={{
                backgroundColor: 'black'
            }}>
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                backgroundColor: 'black',
                borderRadius: 10,
                boxShadow: '0 0px 7px 7px #ffffff',
                padding: '1rem',
                margin: '1rem',
            }}
            display='flex'
            flexDirection='column'

            noValidate
            autoComplete="off"
            >
                
                <StyledTextField name='username' value={username || ''} label='Username' onChange={onChange}/>
                <FormControlLabel
                    control={
                        <Checkbox 
                            name='isAdmin' 
                            checked={isAdmin || ''} 
                            onChange={onChange}
                            style={{color: 'white'}}
                        />
                    }
                    style={{marginLeft: '1rem', color: '#ff2c61'}}
                    label='Is Admin'
                    disabled={user && auth.id === user.id}
                />
                <StyledTextField multiline maxRows={3} name='password' value={password || ''} label='Password' onChange={onChange} />
                <StyledTextField multiline maxRows={3} name='email' value={email || ''} label='Email' onChange={onChange} />
                <StyledTextField name='phoneNumber' value={phoneNumber || ''} label='Phone Number' onChange={onChange} />
                <StyledTextField multiline maxRows={3} name='streetAddress' value={streetAddress || ''} label='Street Address' onChange={onChange} />
                <StyledTextField name='city' value={city || ''} label='City' onChange={onChange} />
                <StyledTextField name='state' value={state || ''} label='State' onChange={onChange} />
                <StyledTextField name='zipcode' value={zipcode || ''} label='Zipcode' onChange={onChange} />
                <Button 
                    style={{
                        borderRadius: 10,
                        background: 'linear-gradient(45deg, #ff2c61, #ff6c61)',
                        color: 'white',
                        boxShadow: '0 0px 3px 3px #1e23b0',
                        width: '40%',
                        alignSelf: 'center'
                    }} 
                    onClick={onSubmit}>
                    {action === 'edit' ? 'Edit User' : 'Add User'}
                </Button>
            </Box>
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = state => {
    return {
        auth: state.auth,
    }
}
const mapDispatch = (dispatch) => {
    return {
        editUser: (user, history) => dispatch(editUser(user, history)),
        addUser: (user, history) => dispatch(addUser(user, history)),
        logout: () => dispatch(logout()),
        loadUser: (auth) => dispatch(loadUser(auth))
    }
}

export default connect(mapState, mapDispatch)(AdminUserForm)
