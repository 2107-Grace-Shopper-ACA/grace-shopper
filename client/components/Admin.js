import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';


/**
 * COMPONENT
 */
export const Admin = props => {
  const {username} = props

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <h5>TODO: INSERT ADMIN STUFF</h5>
      <Link to='/admin/users'>Users</Link>
    </div>

  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Admin)
