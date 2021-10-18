import React, { Component } from 'react'
import {connect} from 'react-redux'
import { loadUsers } from '../store'

/**
 * CLASS COMPONENT
 */
class AdminUsers extends Component {
    componentDidMount() {
        this.props.loadUsers()
    }
    render() {
        const { users } = this.props;

        if (!users){
            return '...loading'
        }
        return (
            <div>
            <ul>
                {
                    users.map( user => {
                        return (
                            <li key={user.id}>
                                Username: {user.username}
                                <br/>
                                Admin: {user.isAdmin ? 'yes' : 'no'}
                            </li>
                        )
                    })
                }
            </ul>
            </div>
        
        )
    }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    users: state.users
  }
}

const mapDispatch = dispatch => {
    return {
        loadUsers: () => dispatch(loadUsers())
    }
}

export default connect(mapState, mapDispatch)(AdminUsers)
