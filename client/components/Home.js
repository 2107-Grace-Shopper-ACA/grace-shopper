import React from 'react'
import {connect} from 'react-redux'
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import Products from './Products';

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <div>
        <Products/>
      </div>
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

export default connect(mapState)(Home)
