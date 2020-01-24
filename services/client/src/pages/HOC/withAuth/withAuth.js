import React from 'react'

const withAuth = (WrappedComponent, options = {}) =>{
  return class WithMenu extends React.Component {
    render() {
      const token = localStorage.getItem('x-erebus-token')
      if (!token) window.location.href = '/signin'

      return (
        <WrappedComponent {...this.props}></WrappedComponent>
      )
    }
  }
}

export default withAuth