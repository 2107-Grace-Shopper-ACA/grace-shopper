import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const AdminUsers = ({users}) => {

  return (
    <div>
      <ul>
          {
            users.map( user => {
                return (
                    <li key={user.id}>
                        Username: {user.username}
                        Admin: {user.isAdmin ? 'yes' : 'no'}
                    </li>
                )
            })
          }
      </ul>
    </div>

  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    users: state.users
  }
}

export default connect(mapState)(AdminUsers)
