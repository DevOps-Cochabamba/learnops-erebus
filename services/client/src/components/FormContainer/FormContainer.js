import React from 'react'
import { Button, Form } from 'semantic-ui-react'

export default (props) => (
  <Form {...props} onSubmit={event => {
    event.preventDefault()
    props.onSubmit(event)
  }}>
    {props.children}
    <Button.Group floated='right'>
      <Button type='button' onClick={event => {
        event.preventDefault()
        props.onCancel && props.onCancel(event)
      }}>Cancel</Button>
      <Button.Or />
      <Button type='submit' primary>Save</Button>
    </Button.Group>
  </Form>
)
