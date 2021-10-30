import React from 'react'
import { connect } from 'react-redux'
import { authenticate } from '../store'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { StyledTextField } from './StyledMUIComponents'
/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '5rem',
      }}
    >
      <form
        component="form"
        noValidate
        autoComplete="off"
        name={name}
        onSubmit={handleSubmit}
      >
        <div
          style={{
            display: 'flex',
            borderRadius: 10,
            color: 'white',
            boxShadow: '0 0px 5px 5px white',
            width: '10rem',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <StyledTextField
            label="Username:"
            name="username"
            InputProps={{ disableUnderline: true }}
          />
          <StyledTextField
            label="Password:"
            name="password"
            type="password"
            InputProps={{ disableUnderline: true }}
          />
          <Button
            style={{
              background: 'linear-gradient(45deg, #30ff34, #baff30)',
              margin: '1rem',
              boxShadow: '0 0px 3px 3px #81c942',
              borderRadius: 10,
              color:'white'
            }}
            type="submit"
          >
            {displayName}
          </Button>
          {error && error.response && (
            <div
              style={{
                borderRadius: 10,
                background: 'linear-gradient(45deg, #ff5d38, #ff0505)',
                color: 'white',
                boxShadow: '0 0px 3px 3px #fa5c5c',
                padding: '.5rem',
              }}
            >
              {error.response.data}
            </div>
          )}
        </div>
      </form>
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
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    },
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
