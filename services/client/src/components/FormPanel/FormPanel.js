import React from 'react'
import { Segment, Label } from 'semantic-ui-react'

import '../../styles/components/panel.css'

export default ({ className, action, title, children }) => (
  <Segment className={`new type form erebus panel ${className || ''}`} secondary>
    <Label as='a' color='blue' ribbon>
      {action}
    </Label>
    <span>{title}</span>
    <br /><br />
    {children}
  </Segment>
)
