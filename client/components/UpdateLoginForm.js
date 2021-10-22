import React, { Component } from 'react'
import {connect} from 'react-redux'
import { editLoggedInUser } from '../store'

class UpdateLoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            error: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount(){
        const { username, password } = this.props.auth;
        console.log(this.props)
        this.setState({ username, password });
    }
    
    onChange(ev) {
        const change = {};
        change[ev.target.name] = ev.target.value;
        this.setState(change);
    }

    async onSubmit(ev){
        ev.preventDefault();
        const { username, password } = this.state;
        const { history, editLoggedInUser, user } = this.props;
        try{
                await editLoggedInUser({...user, username, password }, history);
        } 
        catch (ex){
            console.log(ex);
            this.setState({error: ex.response.data.error});       
        }
    }
    render () {
        const { username, password } = this.state;
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
