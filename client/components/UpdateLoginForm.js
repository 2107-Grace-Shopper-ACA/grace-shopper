import React, { Component } from 'react'
import {connect} from 'react-redux'
import { addUser, editUser, logout } from '../store'

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
        if (this.props.action === 'edit'){
            const { username, password } = this.props.user;
            this.setState({ username, password });
        }
    }
    
    onChange(ev) {
        const change = {};
        change[ev.target.name] = ev.target.type === 'checkbox' ?  ev.target.checked : ev.target.value;
        this.setState(change);
    }

    async onSubmit(ev){
        ev.preventDefault();
        const { username, password } = this.state;
        const { history, handleClose, action, editUser, addUser, user, logout } = this.props;
        try{
            if(action === 'edit'){
                await editUser({...user, username}, history);
            } else {
                await addUser({username, password}, history);
                handleClose();
            }
        } 
        catch (ex){
            console.log(ex);
            this.setState({error: ex.response.data.error});       
        }
    }
    render () {
        const { username, password } = this.state;
        const { onChange, onSubmit } = this;
        const { action, auth, user } = this.props;

        if (action === 'edit' && !user) return '...loading'
        return (
            <div>
                <form onSubmit={onSubmit}>
                    <label>
                        Username:
                    </label>
                        <input name='username' value={username} onChange={onChange} />
                        
                        {
                            action !== 'edit' ? 
                        <>
                            <label>
                                Password:
                            </label>
                            <input name='password' value={password} onChange={onChange} /> 
                        </>    
                            : ''
                        }
                    <button>{action === 'edit' }</button>
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
        auth: state.auth
    }
}
const mapDispatch = (dispatch) => {
    return {
        editUser: (user, history) => dispatch(editUser(user, history)),
        addUser: (user, history) => dispatch(addUser(user, history)),
        logout: () => dispatch(logout()),
    }
}

export default connect(mapState, mapDispatch)(UpdateLoginForm)
