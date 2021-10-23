import React, { Component } from 'react'
import {connect} from 'react-redux'
import { addUser, editUser, logout } from '../store'

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
            isAdmin: false,
            error: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount(){
        if (this.props.action === 'edit'){
            const { username, password, isAdmin } = this.props.user;
            this.setState({ username, password, isAdmin });
        }
    }
    
    onChange(ev) {
        const change = {};
        change[ev.target.name] = ev.target.type === 'checkbox' ?  ev.target.checked : ev.target.value;
        this.setState(change);
    }

    async onSubmit(ev){
        ev.preventDefault();
        const { username, isAdmin, password } = this.state;
        const { history, handleClose, action, editUser, addUser, user } = this.props;
        try{
            if(action === 'edit'){
                await editUser({...user, username, isAdmin}, history);
            } else {
                await addUser({username, password, isAdmin}, history);
                handleClose();
            }
        } 
        catch (ex){
            console.log(ex);
            this.setState({error: ex.response.data.error});       
        }
    }
    render () {
        const { username, isAdmin, password } = this.state;
        const { onChange, onSubmit } = this;
        const { action, auth, user } = this.props;

        if (action === 'edit' && !user) return '...loading'
        return (
            <div>
                <form onSubmit={onSubmit}>
                    <label>
                        Username:
                    </label>
                        <input name='username' value={username || ''} onChange={onChange} />
                        
                        {
                            action !== 'edit' ? 
                        <>
                            <label>
                                Password:
                            </label>
                            <input name='password' value={password || ''} onChange={onChange} /> 
                        </>    
                            : ''
                        }
                    <label>
                        Is Admin:
                    </label>
                        <input disabled={user && auth.id === user.id} name='isAdmin' type="checkbox" checked={isAdmin} onChange={onChange} />
                    <br/>
                    <button>{action === 'edit' ? 'Edit User' : 'Add User'}</button>
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
        editUser: (user, history) => dispatch(editUser(user, history)),
        addUser: (user, history) => dispatch(addUser(user, history)),
        logout: () => dispatch(logout()),
    }
}

export default connect(mapState, mapDispatch)(AdminUserForm)
