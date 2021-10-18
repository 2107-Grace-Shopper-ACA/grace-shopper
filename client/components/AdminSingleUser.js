import React, { Component } from 'react'
import {connect} from 'react-redux'
import { addUser, deleteUser, editUser, logout } from '../store'
import axios from 'axios';
/**
 * CLASS COMPONENT
 */

//getting warning about changing controlled input
//TODO: handle errors
class AdminSingleUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            isAdmin: '',
            error: ''
        }
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.fillForm = this.fillForm.bind(this);
    }
    fillForm(){
        const { username, isAdmin } = this.props.user
        this.setState({username, isAdmin});
    }
    componentDidMount(){
        this.fillForm();
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.user !== this.props.user){
            this.fillForm();
        }
    }
    handleClick(ev) {
        this.props.deleteUser(ev.target.value);
        if (this.state.username === this.props.username){
            this.props.logout()
        }
    }

    onChange(ev) {
        const change = {};
        change[ev.target.name] = ev.target.type === 'checkbox' ?  ev.target.checked : ev.target.value;
        this.setState(change);
    }
    async onSubmit(ev){
        ev.preventDefault();
        try{
            await this.props.editUser({...this.props.user, ...this.state});
            if ((this.state.username === this.props.username) && !this.state.isAdmin){
                this.props.logout()
            }
        } 
        catch (ex){
            console.log(ex);
            this.setState({error: ex.response.data.error});       
        }
    }
    render () {
        const { username, isAdmin } = this.state;
        const { handleClick, onChange, onSubmit } = this;
        const { user } = this.props;

        return (
            <div>
                <form onSubmit={onSubmit}>
                    <label>
                        Username:
                    </label>
                        <input name='username' value={username} onChange={onChange} />
                    <label>
                        Is Admin:
                    </label>
                        <input name='isAdmin' type="checkbox" checked={isAdmin} onChange={onChange} />
                    <br/>
                    <button>Edit</button>
                </form>
                <button value={user.id} onClick={handleClick}>Delete User</button>
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = (state, {match}) => {
  return {
    user: state.users.find(user => user.id === +match.params.id) || {},
    username: state.auth.username
  }
}

const mapDispatch = (dispatch, { history }) => {
    return {
        editUser: (user) => dispatch(editUser(user, history)),
        deleteUser: (id) => dispatch(deleteUser(id, history)),
        logout: () => dispatch(logout()),
    }
}

export default connect(mapState, mapDispatch)(AdminSingleUser)
