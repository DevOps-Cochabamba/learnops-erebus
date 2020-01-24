import React from 'react'

import '../../styles/components/CircularButton.css'

export default ({ code, name, className, action, ...props}) => {
  const actions = !action ? {} : {
    onTouchStart: event => action(true, code, event),
    onTouchEnd: event => action(false, code, event),
    onMouseDown: event => action(true, code, event),
    onMouseUp: event =>  action(false, code, event),
  }

  return (
    <button className={`erebus circular command ui real circular ${className} button`} {...actions} {...props}>
      {name}
    </button>
  )
}
