import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

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
            <>
                {users.map((user) => {
                    return (
                    <div key={user.id}>
                        <Link to={`/admin/users/${user.id}`}>
                            {user.username}
                        </Link>
                    </div>
                    );
                })}
            </>    
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
