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
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    async onSubmit(ev){
        ev.preventDefault();
        const { streetAddress, city, state, zipcode } = this.state;
        const { history, editCartUser, user, loadUser, auth } = this.props;
        try{
            await editCartUser({...user, streetAddress, city, state, zipcode }, history);
            await loadUser(auth);
        } 
        catch (ex){
            this.setState({error: ex.response.data.error});  
        }
    }
    render () {
        const { streetAddress, city, state, zipcode } = this.state;
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
                    <StyledTextField name='streetAddress' value={streetAddress || ''} label='Street Address' onChange={onChange} />
                    <StyledTextField name='city' value={city || ''} label='City' onChange={onChange} />
                    <StyledTextField name='state' value={state || ''} label='State' onChange={onChange} />
                    <StyledTextField name='zipcode' value={zipcode || ''} label='Zipcode' onChange={onChange} />
                    <Button style={{backgroundColor: 'white'}} onClick={onSubmit} disabled={!streetAddress || !city || !state || !zipcode}>
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
        loadUser: (auth) => dispatch(loadUser(auth))
    }
}

export default connect(mapState, mapDispatch)(CartAddress)