import React, { Component } from 'react'
import {connect} from 'react-redux'
import AdminUserForm from './AdminUserForm'

/**
 * CLASS COMPONENT
 */

//getting warning about changing controlled input
//TODO: handle errors
const AdminSingleUser = ({history, user}) => {

    return (
        <div>
            <AdminUserForm history={history} user={user} action={'edit'} />
        </div>
    )
}

const mapState = (state, {match, history}) => {
    return {
    user: state.users.find(user => user.id === +match.params.id) || {},
    history: history
    }
}

export default connect(mapState)(AdminSingleUser)
