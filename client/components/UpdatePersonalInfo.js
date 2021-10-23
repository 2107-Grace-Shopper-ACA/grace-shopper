import React, { Component } from 'react'
import {connect} from 'react-redux'
import { editLoggedInUser } from '../store'

class UpdateLoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            phoneNumber: '',
            error: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount(){
        const { username, password, email, phoneNumber } = this.props.auth;
        console.log(this.props)
        this.setState({ username, password, email, phoneNumber });
    }
    
    onChange(ev) {
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }

    async onSubmit(ev){
        ev.preventDefault();
        const { username, password, email, phoneNumber } = this.state;
        const { history, editLoggedInUser, user } = this.props;
        try{
                await editLoggedInUser({...user, username, password, email, phoneNumber }, history);
        } 
        catch (ex){
            console.log(ex);
            this.setState({error: ex.response.data.error});       
        }
    }
    render () {
        const { username, password, email, phoneNumber } = this.state;
        const { onChange, onSubmit } = this;

        if (!this.props.auth) return '...loading'
        return (
            <div>
                <form onSubmit={onSubmit}>
                    <label>
                        Username:
                    </label>
                        <input name='username' value={username} onChange={onChange} />
                    <label>
                        Password:
                    </label>
                        <input name='password' value={password} onChange={onChange} /> 
                    <label>
                        Email:
                    </label>
                        <input name='email' value={email} onChange={onChange} /> 
                    <label>
                        Phone Number:
                    </label>
                        <input name='phoneNumber' value={phoneNumber} onChange={onChange} /> 
                    <button>Edit User</button>
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
    }
}
const mapDispatch = (dispatch) => {
    return {
        editLoggedInUser: (user, history) => dispatch(editLoggedInUser(user, history)),
    }
}

export default connect(mapState, mapDispatch)(UpdateLoginForm)
