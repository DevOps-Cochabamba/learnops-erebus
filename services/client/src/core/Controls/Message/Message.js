import React from 'react'
import functional from 'react-functional'
import $ from 'jquery'

const timeout = 5000

const Message = ({ sdk, control, query: { mode }}) => {
  const action = (event) => {
    event.preventDefault()
    const value = $('#contentInput').val()
    if (value.length <= 0) return

    const message = value[0] === '{' ? JSON.parse(value) : sdk.message(value)
    $('#contentInput').val('')

    console.log('ME:', message)
    control.send(message)
    const json = JSON.stringify(message)
    $('#messages.messages')
      .prepend(`<div class='content' title='${json}'><b style='color:#21ba45'>ME:</b> ${json}</div>`)
      .children(':first').delay(timeout).slideUp()
  }

  return (
    <div className='erebus control message'>
      <div className='search command input'>
        <form onSubmit={event => action(event)}>
          <div className={'ui big search ' + (mode || '')}>
            <div className='ui icon input'>
              <input autoComplete='off' id='contentInput' className='prompt' type='text' placeholder='Cmd Message or JSON' />
              <i className='paper plane outline icon'></i>
            </div>
          </div>
        </form>
      </div>
      <div id='messages' className='messages' />
    </div>
  )
}


Message.componentDidMount = ({ control }) => {
  control.on('message', (message) => {
    console.log('ROBOT:', message)
    const json = JSON.stringify(message)
    $('#messages.messages')
      .prepend(`<div class='content' title='${json}'><b style='color:#db2828'>ROBOT:</b> ${json}</div>`)
      .children(':first').delay(timeout).slideUp()
  })
  control.on('error', (message) => {
    console.log('ROBOT ERROR:', message)
    $('#messages.messages')
      .prepend(`<div class='ui error message'>Error :(</div>`)
      .children(':first').delay(timeout).slideUp()
  })
  control.start()
}

export default functional(Message)
