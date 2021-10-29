import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { StyledTextField } from './StyledMUIComponents';
/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <Box
        component="form"
        sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            backgroundColor: 'black',
            name: {name}
        }}
        noValidate
        autoComplete="off"
        name={name}
        onSubmit={handleSubmit}
      >
        <div style={{display: 'flex', border: '1px solid white', borderRadius: '4px'}}>
            <StyledTextField label='Username:' name='username'/>
            <StyledTextField label='Password:' name='password' type='password'/>
            <Button style={{backgroundColor: 'white', margin: '1rem'}} type="submit" >{displayName}</Button>
            {error && error.response && <div> {error.response.data} </div>}
        </div>
      </Box>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
