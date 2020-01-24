import React from 'react'

function getMessage(error = {}) {
  return error.errorMessage || error.message || error
}

function getDescription(error = {}) {
  return error.stack || error.errorMessage || error
}

const ErrorMessage = ({ error }) => (
  <div className='ui error message'>
    <div className='header'>
      {getMessage(error)}
    </div>
    
    <ul className='list'>
      <pre>
        {getDescription(error)}
      </pre>
    </ul>
  </div>
)

export default ErrorMessage
