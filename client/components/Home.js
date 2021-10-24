import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <Link to="/orders"><h4>Your Orders</h4></Link>
      <Link to="/updatePersonalInfo"><h4>Update Personal Info</h4></Link>
    </div>

  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.user.username
  }
}

export default connect(mapState)(Home)
