import React, { Component } from 'react'
import {connect} from 'react-redux'
import { editLoggedInUser } from '../store'

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
        if (prevProps !== this.props) {
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
        console.log(this.state)
        console.log(this.props)
        const { history, editLoggedInUser, user } = this.props;
        try{
            await editLoggedInUser({...user, username, password, email, phoneNumber, streetAddress, city, state, zipcode }, history);
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
            <div>
                <form onSubmit={onSubmit}>
                    <label>
                        Username:
                    </label>
                        <input name='username' value={username || ''} onChange={onChange} />
                    <label>
                        Password:
                    </label>
                        <input name='password' value={password || ''} onChange={onChange} /> 
                    <label>
                        Email:
                    </label>
                        <input name='email' value={email || ''} onChange={onChange} /> 
                    <label>
                        Phone Number:
                    </label>
                        <input name='phoneNumber' value={phoneNumber || ''} onChange={onChange} /> 
                    <label>
                        Street Address:
                    </label>
                        <input name='streetAddress' value={streetAddress || ''} onChange={onChange} /> 
                    <label>
                        City:
                    </label>
                        <input name='city' value={city || ''} onChange={onChange} /> 
                    <label>
                        State:
                    </label>
                        <input name='state' value={state || ''} onChange={onChange} /> 
                    <label>
                        Zipcode:
                    </label>
                        <input name='zipcode' value={zipcode || ''} onChange={onChange} /> 
                    <button type='submit' disabled={!username || !password}>Edit User</button>
                </form>
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
        user: state.user
    }
}
const mapDispatch = (dispatch, {history}) => {
    return {
        editLoggedInUser: (user) => dispatch(editLoggedInUser(user, history)),
    }
}

export default connect(mapState, mapDispatch)(UpdatePersonalInfo)
