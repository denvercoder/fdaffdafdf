import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import firebase from '../../firebase'

import useFormValidation from './useFormValidation'
import validateLogin from './validateLogin'

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
}

function Login(props) {
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser)
  const [login, setLogin] = useState(true)
  const [firebaseError, setFirebaseError] = useState(null)

  async function authenticateUser() {
    const { name, email, password } = values
    try {
      login
        ? await firebase.login(email, password)
        : await firebase.register(name, email, password)
      props.history.push('/')
    } catch (err) {
      console.log('Authentication Error: ', err)
      setFirebaseError(err.message)
    }
  }

  return (
    <div>
      <h2 className='mv3'>{login ? 'Sign In' : 'Create Account'}</h2>
      <form onSubmit={handleSubmit} className='flex flex-column'>
        {!login && (
          <input
            className={errors.name && 'error-input'}
            name='name'
            onChange={handleChange}
            onBlur={handleBlur}
            type='text'
            value={values.name}
            placeholder='Your Name'
            autoComplete='off'
          />
        )}
        <input
          className={errors.email && 'error-input'}
          name='email'
          onChange={handleChange}
          onBlur={handleBlur}
          type='email'
          value={values.email}
          placeholder='Your Email'
          autoComplete='off'
        />
        {errors.email && <p className='error-text'>{errors.email}</p>}
        <input
          className={errors.password && 'error-input'}
          name='password'
          onChange={handleChange}
          onBlur={handleBlur}
          type='password'
          value={values.password}
          placeholder='Choose A Password'
        />
        {errors.password && <p className='error-text'>{errors.password}</p>}
        {firebaseError && <p className='error-text'>{firebaseError}</p>}
        <div className='flex mt3'>
          <button
            type='submit'
            className='button pointer mr2'
            disabled={isSubmitting}
            style={{ background: isSubmitting ? 'grey' : 'orange' }}
          >
            Submit
          </button>
          <button
            type='button'
            className='pointer button'
            onClick={() => setLogin(prevLogin => !prevLogin)}
          >
            {login ? 'create an account?' : 'already signed up?'}
          </button>
        </div>
      </form>
      <div className='forgot-password'>
        <Link to='forgot'>forgot password?</Link>
      </div>
    </div>
  )
}

export default Login
