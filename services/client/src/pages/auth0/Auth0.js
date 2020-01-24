import React from 'react'
import { auth } from '../../auth'

const Auth0 = ({ history }) => {
  auth.parseHash((error, authResult) => {
    if (error) {
      alert('Unexpected Error')
      window.location.href = '/signin'
    } else {
      localStorage.setItem('x-erebus-token', authResult.idToken)
      window.location.href = '/'
    }
  })
  
  return (
    <div className='auth0 page content'>
      <div className='ui active inverted dimmer'>
        <div className='ui loader'></div>
      </div>
    </div>
  )
}
export default Auth0
